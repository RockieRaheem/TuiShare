import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import fs from "fs";
import path from "path";

// Q&A pairs extracted from documentation
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

**User:** What is TuiShare?
**Bot:** TuiShare is a platform that connects schools, students, and supporters to facilitate tuition payments and educational support.

**User:** How do I navigate to the student dashboard?
**Bot:** After logging in as a student, you'll be automatically redirected to your dashboard at /student/dashboard.

**User:** How do I navigate to the school dashboard?
**Bot:** After logging in as a school, you'll be automatically redirected to your dashboard at /school/dashboard.

**User:** How do I navigate to the supporter dashboard?
**Bot:** After logging in as a supporter, you'll be automatically redirected to your dashboard at /supporter/dashboard.`;

let vectorStore = null;
let retriever = null;
let chain = null;

async function initializeAssistant() {
  if (vectorStore) return; // Already initialized

  // Extract Q&A pairs from documentation
  const qaRegex = /\*\*User:\*\*\s*(.+?)\n\*\*Bot:\*\*\s*([\s\S]*?)(?=(\n\*\*User:|$))/g;
  let match;
  const qaPairs = [];
  while ((match = qaRegex.exec(documentationText)) !== null) {
    qaPairs.push({ question: match[1].trim(), answer: match[2].trim() });
  }
  
  const documents = qaPairs.map(qa => new Document({ 
    pageContent: qa.question + "\n" + qa.answer 
  }));

  // Create vector store with Gemini embeddings
  vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GOOGLE_API_KEY })
  );

  // Create retriever
  retriever = vectorStore.asRetriever();

  // Create prompt template
  const template = `You are a navigation assistant for TuiShare. Answer the user's question using ONLY the information provided in the context below.
If the answer is not present in the context, reply with: 'I don't know.'
If the user asks for navigation (e.g., 'go to dashboard', 'show transactions'), respond with appropriate guidance.

Context:
{context}

User question: {question}
Assistant answer:`;

  const prompt = new PromptTemplate({
    template,
    inputVariables: ["context", "question"],
  });

  // Initialize Gemini LLM
  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash",
    temperature: 0,
  });

  chain = new LLMChain({ llm, prompt });
}

export async function askAssistant(question) {
  await initializeAssistant();
  
  // Retrieve most relevant Q&A using semantic search
  const docs = await retriever.getRelevantDocuments(question);
  const context = docs.map(doc => doc.pageContent).join("\n");
  
  // Generate answer
  const response = await chain.call({
    context,
    question,
  });
  
  return response.text.trim();
}
