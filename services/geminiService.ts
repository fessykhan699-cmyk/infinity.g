import { GoogleGenAI } from "@google/genai";

export async function generateProjectStrategy(industry: string, goals: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are the lead Executive Strategy Architect at Infinity Digital. 
Deliver a high-impact digital transformation roadmap.

SECTOR: ${industry}
OBJECTIVES: ${goals}

STRUCTURE:
1. STRATEGIC VISION: A single provocative sentence on how this project disrupts the sector.
2. ARCHITECTURAL STACK: Highly specific modern tools (e.g., Next.js 15, MongoDB Atlas, Vercel Edge, Gemini Multi-modal).
3. CORE PILLARS: 3 specific UX or engineering innovations that define the product's elite status.
4. EXECUTION ROADMAP: 3 phases (Foundation, Intelligence Integration, Global Scale).

TONE: Authoritative, tech-forward, and luxury agency style.`,
      config: {
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 24000 }
      }
    });
    
    const strategy = response.text || "";

    if (strategy) {
      fetch('/api/strategies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, goals, strategy })
      }).catch(err => console.error("Strategy sync deferred:", err));
    }

    return strategy;
  } catch (error) {
    console.error("AI Advisor Failure:", error);
    return "The strategic engine is currently processing high-load requests. Please connect with our partners directly for a custom architectural blueprint.";
  }
}

/**
 * Generates an enterprise-grade project visual using gemini-2.5-flash-image or gemini-3-pro-image-preview
 */
export async function generateProjectVisual(
  prompt: string, 
  aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "16:9",
  isPro: boolean = false,
  imageSize: "1K" | "2K" | "4K" = "1K",
  useSearch: boolean = false,
  stylePreset: string = 'Cinematic'
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  // High-fidelity style tokens for the neural engine
  const presetPrompts: Record<string, string> = {
    'Cinematic': 'Masterpiece cinematic visual, luxury enterprise digital aesthetic, ultra-sharp focus, volumetric lighting, unreal engine 5 render, global illumination.',
    'Architectural': 'Clean architectural lines, professional interior/exterior photography, minimalist structural design, realistic materials, soft natural daylight.',
    'Blueprint': 'Advanced technical blueprint, white schematic lines on dark blueprint paper, engineering precision, detailed callouts and measurements, schematic aesthetic.',
    'Minimalist': 'Ultra-minimalist tech aesthetic, clean white spaces, subtle gradients, soft ambient occlusion, pristine surfaces, high-end product photography style.',
    'Cyberpunk': 'Futuristic cyberpunk aesthetic, neon violet and cyan accents, rainy urban atmosphere, high contrast, cinematic night lighting, synthwave influence.',
    'Sketch': 'Artistic hand-drawn architectural sketch, charcoal and graphite, textured paper, concept art style, expressive lines, rough but sophisticated.',
    'Dark Futuristic': 'Deep space aesthetic, futuristic technology, high contrast dark environment, glowing purple and electric blue accents, ultra-modern surfaces, sci-fi minimalism.',
    'Minimalist Tech': 'Pristine white tech surfaces, soft shadows, clean geometric forms, soft volumetric lighting, professional industrial design aesthetic, high-key lighting.',
    'Abstract Data Flow': 'Intricate networks of light, flowing energy patterns, digital visualization of information, complex glowing particles, cinematic depth of field, data-driven art.'
  };

  const styleToken = presetPrompts[stylePreset] || presetPrompts['Cinematic'];
  const enhancedPrompt = `${styleToken} Subject: ${prompt}. Quality: Enterprise Production Grade.`;

  try {
    const config: any = {
      imageConfig: {
        aspectRatio: aspectRatio,
      }
    };

    if (isPro) {
      config.imageConfig.imageSize = imageSize;
      if (useSearch) {
        config.tools = [{ googleSearch: {} }];
      }
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { 
        parts: [{ text: enhancedPrompt }] 
      },
      config: config,
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Synthesis failed to materialise. The brief may be too complex for current neural cores.");
  } catch (error: any) {
    console.error("AI Visual Generator Failure:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      throw new Error("KEY_RESET_REQUIRED");
    }
    throw error;
  }
}