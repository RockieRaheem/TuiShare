import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Types
interface QAPair {
  question: string;
  answer: string;
  combined: string;
  keywords: string[];
}

// Simple keyword-based responses for instant replies
const quickResponses = {
  'register student': 'Go to Student Registration and fill in your full name, email, school ID, school name, and password. Submit the form to create your account.',
  'register school': 'Go to School Registration and fill in your school details, contact person, email, and password. Submit the form to create your account.',
  'register supporter': 'Go to Supporter Registration and fill in your name, email, country, and password. Submit the form to create your account.',
  'login': 'Go to the login page for your user type (School, Student, Supporter), enter your email and password, and submit.',
  'dashboard': 'Your dashboard shows your profile and relevant data. Schools manage payments, Students view payments and resources, Supporters track contributions.',
  'password': 'Currently, password reset is not implemented. Contact support for help.',
  'tuishare': 'TuiShare is a powerful payment infrastructure for African education - supporting Bitcoin, stablecoins, virtual cards, global transfers, and mobile money integration powered by Bitnob technology.',
  'sign out': 'Click the "Sign Out" button on your dashboard.',
  'payment': 'TuiShare supports multiple payment methods: Bitcoin, USDT, Lightning Network, virtual cards, mobile money, and global transfers. Choose your preferred method in your dashboard.',
  'support': 'Get 24/7 support via our dedicated support team. Contact us through the platform or email for help with payments, registration, or technical issues.',
  'bitcoin': 'Buy and sell Bitcoin instantly with local payment methods. TuiShare uses Bitnob infrastructure for secure Bitcoin transactions across Africa.',
  'btc': 'Bitcoin payments on TuiShare are instant and secure. Purchase Bitcoin with local methods or receive BTC from global supporters.',
  'usdt': 'USDT stablecoin payments provide price stability for tuition. Send USDT globally with low fees using our Bitnob-powered infrastructure.',
  'stablecoin': 'TuiShare supports multiple stablecoins (USDT, USDC) for stable-value tuition payments. Earn rewards on your stablecoin savings.',
  'lightning': 'Lightning Network enables instant, low-cost Bitcoin payments. Perfect for small tuition contributions and micro-payments.',
  'virtual card': 'Create virtual cards for online education purchases, course subscriptions, and learning materials. Manage cards from your dashboard.',
  'mobile money': 'Send and receive payments via mobile money (M-Pesa, MTN Mobile Money, Airtel Money) integrated with crypto through Bitnob infrastructure.',
  'global transfer': 'Send money to anyone, anywhere in the world instantly using our global transfer system powered by Bitnob technology.',
  'savings': 'Earn rewards on your Bitcoin and stablecoin savings while supporting education. Auto-save features available for supporters.',
  'secure wallet': 'Your digital assets are protected with enterprise-grade security. Multi-signature wallets and cold storage for large amounts.',
  'api': 'Developers can integrate TuiShare payment infrastructure using our comprehensive API. Support for webhooks, OAuth 2.0, and SDKs.',
  'webhook': 'Real-time payment notifications via webhooks. Get instant updates when tuition payments are received or processed.',
  'bitnob infrastructure': 'TuiShare is built on Bitnob payment infrastructure, providing enterprise-grade crypto payment solutions for African education funding.'
};

// Response cache for frequently asked questions
const responseCache = new Map<string, { answer: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Documentation text from your MVP
const documentationText = `This documentation guides developers to create an AI-powered chatbot for the TuiShare platform. The chatbot will help users navigate the system, answer questions, and explain features and workflows for schools, students, and supporters.

2. Chatbot Features

- **Navigation Guidance:** Explains how to register, login, and access dashboards.
- **Contextual Help:** Answers questions about forms, errors, and user flows.
- **System Explanation:** Describes the purpose and structure of TuiShare.
- **User-Specific Assistance:** Guides users based on their role (school, student, supporter).
- **Error Handling:** Provides troubleshooting steps for common issues (e.g., database connection, authentication).

**User:** How do I register as a school?
**Bot:** Go to School Registration and fill in your school details, contact person, email, and password. Submit the form to create your account.

**User:** How do I register as a student?
**Bot:** Go to Student Registration and fill in your full name, email, school ID, school name, and password. Submit the form to create your account.

**User:** How do I register as a supporter?
**Bot:** Go to Supporter Registration and fill in your name, email, country, and password. Submit the form to create your account.

**User:** How do I login?
**Bot:** Go to the login page for your user type (School, Student, Supporter), enter your email and password, and submit.

**User:** I forgot my password, what should I do?
**Bot:** Currently, password reset is not implemented. Contact support for help.

**User:** What can I do on my dashboard?
**Bot:** Your dashboard shows your profile and relevant data:

Schools: Manage tuition payments, confirm receipts, view student records.
Students: View tuition payments, manage profile, access resources.
Supporters: Track contributions, view supported students, manage profile.

**User:** How do I update my profile details?
**Bot:** Go to your dashboard and click "Edit Profile." Update your details and save.

**User:** How do I view my contributions?
**Bot:** Supporters can view recent contributions in the "Recent Contributions" section of their dashboard.

**User:** How do I sign out?
**Bot:** Click the "Sign Out" button on your dashboard.

**User:** What should I do if I get a network error when registering?
**Bot:** Check your internet connection and try again. If the problem persists, contact support.

**User:** What should I do if I have a database connection error?
**Bot:** Ensure your IP is whitelisted in MongoDB Atlas. See MongoDB Atlas IP Whitelist.

**User:** How do I ensure my IP is whitelisted in MongoDB Atlas?
**Bot:** Go to your Atlas dashboard, "Network Access," and add your current IP address.

**User:** What is TuiShare?
**Bot:** TuiShare is a powerful payment infrastructure for African education built on Bitnob technology. We provide Bitcoin, stablecoins, Lightning Network, virtual cards, mobile money integration, and global transfers - all designed for seamless education funding across Africa.

**User:** What payment methods does TuiShare support?
**Bot:** TuiShare supports: 💱 Bitcoin & stablecoins with local payment methods, 🌍 Global transfers, 💳 Virtual cards, ⚡ Lightning Network for instant payments, 📱 Mobile money (M-Pesa, MTN, Airtel), 💰 Savings with rewards, and 🔒 Secure wallet storage.

**User:** How does the Lightning Network work for education payments?
**Bot:** Lightning Network enables instant, low-cost Bitcoin payments perfect for small tuition contributions and micro-payments. Send even $1 instantly with minimal fees - ideal for crowdfunding student education.

**User:** Can I create virtual cards for education expenses?
**Bot:** Yes! Create virtual cards for online education purchases, course subscriptions, learning materials, and digital resources. Manage all your education-related cards from your TuiShare dashboard.

**User:** How does mobile money integration work?
**Bot:** TuiShare integrates with African mobile money services (M-Pesa, MTN Mobile Money, Airtel Money) through Bitnob infrastructure. Send crypto, receive mobile money, or vice versa - bridging traditional and digital payments.

**User:** What global transfer options are available?
**Bot:** Send money to anyone, anywhere in the world instantly using our global transfer system. Support students across all African countries from anywhere globally with real-time settlement.

**User:** How do savings and rewards work?
**Bot:** Earn rewards on your Bitcoin and stablecoin savings while supporting education. Set up auto-save features to regularly contribute to student funds and grow your crypto holdings simultaneously.

**User:** What security features protect my funds?
**Bot:** TuiShare uses enterprise-grade security: multi-signature wallets, cold storage for large amounts, secure API endpoints, IP whitelisting, and 24/7 monitoring to keep your digital assets safe.

**User:** Is there an API for developers?
**Bot:** Yes! TuiShare provides comprehensive APIs for payment integration: webhooks for real-time notifications, OAuth 2.0 authentication, SDKs for multiple languages, rate limiting, and complete documentation for developers.

**User:** How do webhooks work for payment notifications?
**Bot:** Webhooks provide real-time payment notifications when tuition payments are received, processed, or completed. Perfect for schools to get instant updates and automated record keeping.

**User:** What stablecoins are supported?
**Bot:** TuiShare supports multiple stablecoins including USDT, USDC, and other major stablecoins for price-stable tuition payments. Ideal for budget planning and avoiding cryptocurrency volatility.

**User:** How does TuiShare compare to traditional payment methods?
**Bot:** Traditional: Days for transfers, high fees, limited access, complex processes. TuiShare: Instant transfers, low fees, global access, simple interface, 24/7 availability, transparent tracking, and multiple payment options.

**User:** How do I get help with registration or login?
**Bot:** Contact support via the provided contact page or email.

**User:** How do I contact support?
**Bot:** Use the contact form on the website or email the support address listed.

**User:** What are the best practices for using TuiShare?
**Bot:** Use strong, unique passwords. Keep your profile information up to date. Ensure your IP is whitelisted for database access. Contact support for any issues.

**User:** How do I keep my account secure?
**Bot:** Use a strong, unique password and never share your login details. Always log out after using the platform, especially on shared devices.

**User:** How do I change my password?
**Bot:** Currently, password change is not available. Please contact support for assistance.

**User:** How do I make a tuition payment (for supporters)?
**Bot:** After logging in as a supporter, go to the student's profile and follow the instructions to make a payment.

**User:** How do I confirm a payment (for schools)?
**Bot:** Schools can confirm tuition payments from their dashboard by reviewing and approving received payments.

**User:** How do I view my payment history?
**Bot:** Go to your dashboard and select the payment history or transactions section.

**User:** How do I delete my account?
**Bot:** Please contact support to request account deletion.

**User:** Can I have multiple accounts?
**Bot:** Each user should have only one account per role (school, student, supporter) for security and accountability.

**User:** What resources are available for students?
**Bot:** Students can access educational resources and view their virtual card from their dashboard.

**User:** How do I invite others to join TuiShare?
**Bot:** Share the registration link with friends, schools, or supporters who want to join the platform.

**User:** What information is shown on my dashboard?
**Bot:** Your dashboard displays your profile and relevant data (payments, contributions, student records).

**User:** How do I manage my student records (for schools)?
**Bot:** Schools can view and update student records from their dashboard.

**User:** How do I view my virtual card (for students)?
**Bot:** Students can view their virtual card and payment history on their dashboard.

**User:** How do I track my impact (for supporters)?
**Bot:** Supporters can view their contributions and supported students on their dashboard.

**User:** How do I change my account details?
**Bot:** To change your account details, go to your dashboard and look for an "Edit Profile" or "Account Settings" section. Update your information and save the changes.`;

// Global cache for faster responses
let vectorStore: MemoryVectorStore | null = null;
let retriever: any = null;
let chain: LLMChain | null = null;
let isInitializing = false;
let qaPairs: QAPair[] | null = null;

// Pre-process Q&A pairs once
function extractQAPairs(): QAPair[] {
  if (qaPairs) return qaPairs;
  
  const qaRegex = /\*\*User:\*\*\s*(.+?)\n\*\*Bot:\*\*\s*([\s\S]*?)(?=(\n\*\*User:|$))/g;
  let match;
  qaPairs = [];
  while ((match = qaRegex.exec(documentationText)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    qaPairs.push({ 
      question,
      answer,
      combined: question + "\n" + answer,
      keywords: question.toLowerCase().split(/\s+/).filter(word => word.length > 2)
    });
  }
  return qaPairs;
}

// Fast keyword matching for instant responses
function getQuickResponse(question: string): string | null {
  const lowerQuestion = question.toLowerCase();
  
  // Check for exact keyword matches
  for (const [key, response] of Object.entries(quickResponses)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }
  
  // Check cache first
  const cacheKey = lowerQuestion.replace(/\s+/g, ' ').trim();
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.answer;
  }
  
  return null;
}

async function initializeAssistant() {
  if (vectorStore) return; // Already initialized
  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return;
  }

  isInitializing = true;

  try {
    console.log('Initializing assistant...');
    
    // Pre-extract Q&A pairs
    const pairs = extractQAPairs();
    console.log(`Processed ${pairs.length} Q&A pairs`);
    
    const documents = pairs.map((qa: QAPair) => new Document({ 
      pageContent: qa.combined
    }));

    // Create vector store with optimized settings
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "embedding-001"
    });

    vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);

    // Create retriever with very fast settings
    retriever = vectorStore.asRetriever({
      k: 2, // Only get top 2 results for speed
      searchType: "similarity"
    });

    // Create very simple prompt template
    const template = `Context: {context}

Question: {question}
Answer:`;

    const prompt = new PromptTemplate({
      template,
      inputVariables: ["context", "question"],
    });

    // Initialize Gemini LLM with speed optimizations
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-1.5-flash",
      temperature: 0,
      maxOutputTokens: 150, // Reduced for faster responses
      maxRetries: 1, // Reduce retries for speed
    });

    chain = new LLMChain({ llm, prompt });
    console.log('Assistant initialized successfully');
  } catch (error) {
    console.error('Failed to initialize assistant:', error);
    throw error;
  } finally {
    isInitializing = false;
  }
}

async function askAssistant(question: string): Promise<string> {
  // First try quick response for instant replies
  const quickResponse = getQuickResponse(question);
  if (quickResponse) {
    return quickResponse;
  }

  // If no quick response, use RAG but with timeout
  try {
    await Promise.race([
      initializeAssistant(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Initialization timeout')), 2000))
    ]);
    
    if (!retriever || !chain) {
      throw new Error('Assistant not properly initialized');
    }

    // Set a timeout for the entire RAG process
    const ragPromise = async () => {
      const docs = await retriever.getRelevantDocuments(question);
      const context = docs.map((doc: any) => doc.pageContent).join("\n");
      
      if (!chain) {
        throw new Error('Assistant chain is not initialized');
      }
      const response = await chain.call({
        context: context.substring(0, 1000), // Limit context for speed
        question,
      });
      
      return response.text.trim();
    };

    // Race between RAG response and timeout
    const answer = await Promise.race([
      ragPromise(),
      new Promise<string>((_, reject) => 
        setTimeout(() => reject(new Error('Response timeout')), 2500)
      )
    ]);

    // Cache the response
    const cacheKey = question.toLowerCase().replace(/\s+/g, ' ').trim();
    responseCache.set(cacheKey, { answer, timestamp: Date.now() });

    return answer;
  } catch (error) {
    console.error('RAG failed, using fallback:', error);
    
    // Fallback to simple keyword matching from Q&A pairs
    const pairs = extractQAPairs();
    const lowerQuestion = question.toLowerCase();
    
    for (const pair of pairs) {
      if (pair.keywords.some(keyword => lowerQuestion.includes(keyword))) {
        return pair.answer;
      }
    }
    
    return "I'm having trouble processing your request right now. Please try asking about registration, login, dashboard, or payments.";
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const answer = await askAssistant(question);
    const responseTime = Date.now() - startTime;
    
    console.log(`Response time: ${responseTime}ms`);
    
    return res.status(200).json({ answer, responseTime });
  } catch (error) {
    console.error('Assistant error:', error);
    return res.status(500).json({ error: 'Failed to get assistant response' });
  }
}

// Pre-initialize the assistant when the module loads
initializeAssistant().catch(console.error);
