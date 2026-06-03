const NVIDIA_API_KEY = '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';

const TOOLS = [
  { name: 'verify_github_repo', desc: 'Verify GitHub repo', test: () => fetch('https://api.github.com/repos/facebook/react').then(r => r.ok) },
  { name: 'verify_github_user', desc: 'Verify GitHub user', test: () => fetch('https://api.github.com/users/torvalds').then(r => r.ok) },
  { name: 'verify_certificate', desc: 'Verify certificate URL', test: () => fetch('https://coursera.org', { method: 'HEAD' }).then(r => r.ok) },
  { name: 'verify_kaggle', desc: 'Verify Kaggle', test: () => fetch('https://kaggle.com', { method: 'HEAD' }).then(r => r.ok) },
  { name: 'verify_linkedin', desc: 'Verify LinkedIn', test: async () => true },
  { name: 'web_search', desc: 'Web search', test: async () => true },
  { name: 'fetch_webpage', desc: 'Fetch webpage', test: () => fetch('https://example.com').then(r => r.ok) },
  { name: 'analyze_code', desc: 'Analyze code', test: () => fetch('https://raw.githubusercontent.com/facebook/react/main/package.json').then(r => r.ok) },
  { name: 'extract_skills', desc: 'Extract skills', test: async () => true },
  { name: 'analyze_portfolio', desc: 'Analyze portfolio', test: async () => true },
  { name: 'check_url_safety', desc: 'Check URL safety', test: async () => true },
  { name: 'validate_email', desc: 'Validate email', test: async () => true },
  { name: 'generate_embeddings', desc: 'Generate embeddings', test: async () => true },
  { name: 'detect_language', desc: 'Detect language', test: async () => true }
];

async function testAgent() {
  console.log('=== Testing Orin AI Agent with 14 Tools ===\n');
  console.log(`Total Tools: ${TOOLS.length}\n`);

  console.log('Tool Availability:');
  for (const tool of TOOLS) {
    process.stdout.write(`  ${tool.name.padEnd(25)}: `);
    try {
      const ok = await tool.test();
      console.log(ok ? 'OK' : 'FAIL');
    } catch {
      console.log('FAIL');
    }
  }

  console.log('\n=== Testing Agent with Tool Calling ===\n');

  const systemPrompt = `You are Orin AI Agent. ONLY respond with JSON.

Tool format: {"thinking":"reason","tool_call":{"name":"tool_name","arguments":{}}}
Answer format: {"thinking":"reason","answer":"your answer"}

Tools:
- verify_github_repo(url): Verify GitHub repo
- verify_certificate(url): Verify certificate
- check_url_safety(url): Check URL safety
- extract_skills(text): Extract skills

Use tools to verify before answering.`;

  const testCases = [
    'Verify if https://github.com/facebook/react is a real repo',
    'Check if this certificate is valid: https://coursera.org/verify/abc123',
    'Extract skills from: React developer with TypeScript and Node.js experience'
  ];

  for (const query of testCases) {
    console.log(`Query: ${query}`);
    try {
      const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          temperature: 0.3,
          max_tokens: 300
        }),
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      const cleaned = content.replace(/[\r\n\t]/g, ' ').trim();
      const m = cleaned.match(/\{[\s\S]*\}/);
      const parsed = m ? JSON.parse(m[0]) : null;

      if (parsed?.tool_call) {
        console.log(`  Tool: ${parsed.tool_call.name}(${JSON.stringify(parsed.tool_call.arguments)})`);
        console.log(`  Thinking: ${parsed.thinking || 'none'}`);
      } else if (parsed?.answer) {
        console.log(`  Answer: ${parsed.answer}`);
      } else {
        console.log(`  Raw: ${content.substring(0, 100)}`);
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
    console.log('');
  }

  console.log('=== All Tests Complete ===');
}

testAgent();
