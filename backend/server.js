require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.send("Trading Bot Backend is Working!");
});


// ==========================================
// DEMO FALLBACK ANALYSIS
// ==========================================

function createDemoAnalysis(marketData) {

    const price = Number(marketData.price || 60000);
    const profitLoss = Number(marketData.profitLoss || 0);

    let trend = "NEUTRAL";
    let risk = "MEDIUM";
    let signal = "HOLD";

    // Simple demo logic
    if (price > 61000) {
        trend = "BULLISH";
    } else if (price < 59000) {
        trend = "BEARISH";
    }

    if (Math.abs(profitLoss) > 10) {
        risk = "HIGH";
    } else if (Math.abs(profitLoss) < 5) {
        risk = "LOW";
    }

    return `Market Trend: ${trend}
Risk Level: ${risk}
Demo Signal: ${signal}

Short Explanation:
BTC/USD is currently being evaluated using the available demo market data. The dashboard is in educational/demo mode, so the signal is HOLD while waiting for clearer market movement.

Analysis Mode: DEMO FALLBACK
Note: Gemini quota is temporarily unavailable, so this result is generated locally for dashboard demonstration.`;
}


// ==========================================
// AI ANALYZE API
// ==========================================

app.post("/api/analyze", async (req, res) => {

    try {

        console.log("================================");
        console.log("Analyze API received request");
        console.log("Market Data:", req.body);
        console.log("================================");

        const { marketData } = req.body;

        if (!marketData) {

            return res.status(400).json({
                success: false,
                error: "Market data is missing"
            });

        }


        // ==========================================
        // PROMPT
        // ==========================================

        const prompt = `
You are an AI assistant for a DEMO trading dashboard.

Analyze this educational demo market data:

${JSON.stringify(marketData, null, 2)}

Return ONLY this format:

Market Trend: BULLISH
Risk Level: MEDIUM
Demo Signal: HOLD

Short Explanation:
Write 2 short sentences.

Rules:
- Market Trend: BULLISH, BEARISH, or NEUTRAL
- Risk Level: LOW, MEDIUM, or HIGH
- Demo Signal: BUY, SELL, or HOLD
- Educational/demo purposes only
- Do not execute trades
- Do not guarantee profit
`;


        // ==========================================
        // GEMINI REQUEST
        // ==========================================

        console.log("Sending request to Gemini...");

        let response;

        try {

            response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt
            });

        } catch (geminiError) {

            console.log("================================");
            console.log("Gemini unavailable");
            console.log("Status:", geminiError.status);
            console.log("================================");

            // ==========================================
            // USE LOCAL DEMO FALLBACK
            // ==========================================

            const fallback =
                createDemoAnalysis(marketData);

            return res.json({

                success: true,

                analysis: fallback,

                source: "demo-fallback"

            });

        }


        // ==========================================
        // GET AI TEXT
        // ==========================================

        const analysis =
            response.text || createDemoAnalysis(marketData);


        console.log("AI Analysis:");
        console.log(analysis);


        // ==========================================
        // SEND TO FRONTEND
        // ==========================================

        return res.json({

            success: true,

            analysis: analysis,

            source: "gemini"

        });


    } catch (error) {

        console.error("SERVER ERROR:");
        console.error(error);


        // ==========================================
        // EVEN IF SOMETHING ELSE FAILS,
        // RETURN DEMO RESULT
        // ==========================================

        const fallback =
            createDemoAnalysis(
                req.body?.marketData || {}
            );


        return res.json({

            success: true,

            analysis: fallback,

            source: "demo-fallback"

        });

    }

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("AI TRADING BOT BACKEND");
    console.log("================================");
    console.log(
        `Backend running at http://localhost:${PORT}`
    );
    console.log("================================");
    console.log("");

});