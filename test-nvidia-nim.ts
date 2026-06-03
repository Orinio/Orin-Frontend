import { buildSystemPrompt, buildDailyTipPrompt, parseCoachResponse } from './lib/prompts';
import { analyzeSkills } from './lib/skills';
import type { Proof, User } from './lib/types';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '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';
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NIM_MODEL = 'meta/llama-3.3-70b-instruct';

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  fullName: 'John Doe',
  college: 'MIT',
  year: 'third',
  role: 'user',
  accountStatus: 'active',
  isProfilePublic: true,
  hideEmail: false,
  emailVerified: true,
  authProvider: 'email',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProofs: Proof[] = [
  {
    id: '1',
    userId: '1',
    title: 'React Dashboard',
    description: 'A React dashboard project',
    sourceType: 'github',
    sourceUrl: 'https://github.com/user/react-dashboard',
    skillsExtracted: ['react', 'javascript', 'typescript'],
    skillsUserAdded: ['dashboard', 'ui'],
    whatItProves: ['Frontend development'],
    verificationStatus: 'verified',
    visibility: 'public',
    viewCount: 100,
    isHighlighted: true,
    sortOrder: 1,
    metadata: {},
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '1',
    title: 'Python Data Analysis',
    description: 'Data analysis with Python',
    sourceType: 'kaggle',
    sourceUrl: 'https://kaggle.com/user/data-analysis',
    skillsExtracted: ['python', 'pandas', 'numpy'],
    skillsUserAdded: ['data analysis', 'machine learning'],
    whatItProves: ['Data science skills'],
    verificationStatus: 'verified',
    visibility: 'public',
    viewCount: 50,
    isHighlighted: false,
    sortOrder: 2,
    metadata: {},
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

async function testNvidiaNimIntegration() {
  console.log('Testing NVIDIA NIM Integration...\n');

  const skillAnalysis = analyzeSkills(mockProofs);
  console.log('Skill Analysis:', JSON.stringify(skillAnalysis, null, 2));
  console.log('\n');

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildDailyTipPrompt({
    user: mockUser,
    proofs: mockProofs,
    skillAnalysis,
    noteType: 'daily',
  });

  console.log('System Prompt (first 500 chars):');
  console.log(systemPrompt.substring(0, 500) + '...\n');

  console.log('User Prompt (first 500 chars):');
  console.log(userPrompt.substring(0, 500) + '...\n');

  try {
    console.log('Calling NVIDIA NIM API...');
    const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: NIM_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return;
    }

    const data = await response.json();
    console.log('API Response:');
    console.log('Model:', data.model);
    console.log('Tokens Used:', data.usage?.total_tokens);
    console.log('Response Content:');
    console.log(data.choices[0]?.message?.content);
    console.log('\n');

    const parsed = parseCoachResponse(data.choices[0]?.message?.content || '');
    if (parsed) {
      console.log('Parsed Coach Note:');
      console.log('Content:', parsed.content);
      console.log('Action Label:', parsed.actionLabel);
      console.log('Action URL:', parsed.actionUrl);
      console.log('Priority:', parsed.priority);
    } else {
      console.log('Failed to parse coach note response');
    }

    console.log('\n✅ NVIDIA NIM Integration Test Completed Successfully!');
  } catch (error) {
    console.error('❌ Test Failed:', error);
  }
}

testNvidiaNimIntegration();
