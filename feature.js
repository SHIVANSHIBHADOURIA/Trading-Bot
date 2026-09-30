/* =========================================================
   EXTRA FEATURES
   1. AI Signal Explanation
   2. What-If Market Simulator
   3. System Health
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       EXTRA CSS
    ====================================================== */

    const style = document.createElement("style");

    style.textContent = `
        .extra-feature-section {
            padding: 18px;
            margin-bottom: 18px;
            background: rgba(8, 20, 24, 0.94);
            border: 1px solid rgba(69, 217, 181, 0.12);
            border-radius: 16px;
        }

        .extra-feature-heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-bottom: 16px;
        }

        .extra-feature-heading h2 {
            margin: 0;
            font-size: 20px;
            color: #eaf7f3;
        }

        .extra-feature-heading p {
            margin-top: 5px;
            color: #6d8681;
            font-size: 12px;
        }

        .extra-badge {
            padding: 7px 10px;
            border-radius: 999px;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: .08em;
            background: rgba(120, 105, 255, 0.10);
            color: #aa9aff;
        }

        /* =================================================
           SIGNAL EXPLANATION
        ================================================== */

        .signal-explanation-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 15px;
        }

        .signal-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .signal-summary-card,
        .signal-factor-card {
            background: #0a191e;
            border: 1px solid rgba(64, 193, 166, 0.10);
            border-radius: 12px;
            padding: 15px;
        }

        .signal-summary-card span,
        .signal-factor-row span {
            color: #607874;
            font-size: 9px;
        }

        .signal-summary-card strong {
            display: block;
            margin-top: 9px;
            color: #39dfad;
            font-size: 17px;
        }

        .signal-factor-card h3 {
            margin-bottom: 10px;
            font-size: 13px;
            color: #dcece8;
        }

        .signal-factor-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(75, 120, 113, 0.10);
        }

        .signal-factor-row:last-child {
            border-bottom: none;
        }

        .signal-factor-row strong {
            color: #bdd2cd;
            font-size: 10px;
            text-align: right;
        }

        /* =================================================
           WHAT IF SIMULATOR
        ================================================== */

        .simulator-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .simulator-box {
            padding: 15px;
            background: #0a191e;
            border: 1px solid rgba(64, 193, 166, 0.10);
            border-radius: 12px;
        }

        .simulator-box label {
            display: block;
            margin-bottom: 8px;
            color: #607874;
            font-size: 9px;
        }

        .simulator-box strong {
            color: #d9ebe7;
            font-size: 20px;
        }

        .simulator-box input {
            width: 100%;
            padding: 11px;
            background: #09171c;
            color: #e0f2ed;
            border: 1px solid #1b363c;
            border-radius: 9px;
            outline: none;
        }

        .simulator-box input:focus {
            border-color: #25dca5;
        }

        .simulator-button {
            margin-top: 14px;
            padding: 11px 15px;
            border: none;
            border-radius: 9px;
            background: linear-gradient(
                135deg,
                #1de2a2,
                #149ad1
            );
            color: #03110d;
            font-weight: 800;
            font-size: 11px;
            cursor: pointer;
        }

        .simulator-button:hover {
            opacity: 0.92;
        }

        .simulation-result {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 14px;
        }

        .simulation-result > div {
            padding: 15px;
            background: #0a191e;
            border: 1px solid rgba(64, 193, 166, 0.10);
            border-radius: 12px;
        }

        .simulation-result span {
            display: block;
            color: #607874;
            font-size: 9px;
        }

        .simulation-result strong {
            display: block;
            margin-top: 8px;
            color: #38dfac;
            font-size: 19px;
        }

        /* =================================================
           SYSTEM HEALTH
        ================================================== */

        .health-grid-extra {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }

        .health-item-extra {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            padding: 16px;
            background: #0a191e;
            border: 1px solid rgba(64, 193, 166, 0.10);
            border-radius: 12px;
        }

        .health-item-extra strong {
            display: block;
            color: #d8e8e4;
            font-size: 12px;
        }

        .health-item-extra small {
            display: block;
            margin-top: 5px;
            color: #607874;
            font-size: 9px;
        }

        .health-status-extra {
            color: #37dfaa;
            font-size: 9px;
            font-weight: 800;
            white-space: nowrap;
        }

        .health-status-extra.offline {
            color: #ff7d87;
        }

        /* =================================================
           RESPONSIVE
        ================================================== */

        @media (max-width: 850px) {

            .signal-explanation-grid {
                grid-template-columns: 1fr;
            }

            .health-grid-extra {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 650px) {

            .signal-summary,
            .simulator-grid,
            .simulation-result,
            .health-grid-extra {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       HELPERS
    ====================================================== */

    function formatMoney(value) {

        const sign =
            value >= 0
                ? "+"
                : "-";

        return (
            sign +
            "$" +
            Math.abs(value).toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
        );
    }


    function parsePrice(text) {

        if (!text) {
            return 0;
        }

        const value =
            Number(
                String(text)
                    .replace(/[$,+]/g, "")
                    .replace(/,/g, "")
                    .trim()
            );

        return Number.isFinite(value)
            ? value
            : 0;
    }


    function insertAfter(
        reference,
        element
    ) {

        if (
            !reference ||
            !reference.parentNode
        ) {
            return;
        }

        reference.parentNode.insertBefore(
            element,
            reference.nextSibling
        );
    }


    /* =====================================================
       1. AI SIGNAL EXPLANATION
    ====================================================== */

    const aiPanel =
        document.querySelector(
            ".ai-panel"
        );

    if (aiPanel) {

        const section =
            document.createElement(
                "section"
            );

        section.className =
            "extra-feature-section";

        section.innerHTML = `

            <div class="extra-feature-heading">

                <div>

                    <h2>
                        Signal Explanation
                    </h2>

                    <p>
                        Why the current demo signal was generated
                    </p>

                </div>

                <span class="extra-badge">
                    AI INSIGHT
                </span>

            </div>


            <div class="signal-explanation-grid">


                <div class="signal-summary">


                    <div class="signal-summary-card">

                        <span>
                            Signal
                        </span>

                        <strong
                            id="extraExplainSignal"
                        >
                            HOLD
                        </strong>

                    </div>


                    <div class="signal-summary-card">

                        <span>
                            Trend
                        </span>

                        <strong
                            id="extraExplainTrend"
                        >
                            NEUTRAL
                        </strong>

                    </div>


                    <div class="signal-summary-card">

                        <span>
                            Risk
                        </span>

                        <strong
                            id="extraExplainRisk"
                        >
                            LOW
                        </strong>

                    </div>


                </div>


                <div class="signal-factor-card">

                    <h3>
                        Key Factors
                    </h3>


                    <div class="signal-factor-row">

                        <span>
                            RSI
                        </span>

                        <strong
                            id="extraExplainRSI"
                        >
                            Neutral
                        </strong>

                    </div>


                    <div class="signal-factor-row">

                        <span>
                            MACD
                        </span>

                        <strong
                            id="extraExplainMACD"
                        >
                            Bullish
                        </strong>

                    </div>


                    <div class="signal-factor-row">

                        <span>
                            EMA
                        </span>

                        <strong
                            id="extraExplainEMA"
                        >
                            Price Above EMA
                        </strong>

                    </div>


                    <div class="signal-factor-row">

                        <span>
                            Volatility
                        </span>

                        <strong
                            id="extraExplainVolatility"
                        >
                            Medium
                        </strong>

                    </div>

                </div>

            </div>
        `;


        insertAfter(
            aiPanel,
            section
        );
    }


    /* =====================================================
       2. WHAT-IF MARKET SIMULATOR
    ====================================================== */

    const indicatorSection =
        document.querySelector(
            ".indicators-section"
        );

    if (indicatorSection) {

        const section =
            document.createElement(
                "section"
            );

        section.className =
            "extra-feature-section";

        section.id =
            "extraSimulator";

        section.innerHTML = `

            <div class="extra-feature-heading">

                <div>

                    <h2>
                        What-If Market Simulator
                    </h2>

                    <p>
                        Test a hypothetical BTC/USD price movement
                    </p>

                </div>

                <span class="extra-badge">
                    SIMULATION
                </span>

            </div>


            <div class="simulator-grid">


                <div class="simulator-box">

                    <label>
                        Current BTC Price
                    </label>

                    <strong
                        id="extraSimCurrentPrice"
                    >
                        $60,017.65
                    </strong>

                </div>


                <div class="simulator-box">

                    <label>
                        Hypothetical Change (%)
                    </label>

                    <input
                        type="number"
                        id="extraSimPercent"
                        value="5"
                        step="0.5"
                    >

                </div>


            </div>


            <button
                type="button"
                class="simulator-button"
                id="extraSimulateBtn"
            >
                Run Simulation
            </button>


            <div class="simulation-result">


                <div>

                    <span>
                        Simulated BTC Price
                    </span>

                    <strong
                        id="extraSimulatedPrice"
                    >
                        $63,018.53
                    </strong>

                </div>


                <div>

                    <span>
                        Estimated Position P/L
                    </span>

                    <strong
                        id="extraSimulatedPL"
                    >
                        +$0.00
                    </strong>

                </div>


            </div>
        `;


        insertAfter(
            indicatorSection,
            section
        );


        function getCurrentBTCPrice() {

            const priceElement =
                document.getElementById(
                    "marketPrice"
                );

            return parsePrice(
                priceElement
                    ? priceElement.textContent
                    : "60017.65"
            );
        }


        function calculateEstimatedPL(
            simulatedPrice
        ) {

            let result = 0;

            const rows =
                document.querySelectorAll(
                    "#activeTradesBody tr"
                );


            rows.forEach(row => {

                const cells =
                    row.querySelectorAll(
                        "td"
                    );


                if (
                    cells.length < 6
                ) {
                    return;
                }


                const asset =
                    cells[0]
                        .textContent
                        .trim();


                if (
                    asset !== "BTC/USD"
                ) {
                    return;
                }


                const type =
                    cells[1]
                        .textContent
                        .trim()
                        .toUpperCase();


                const entry =
                    parsePrice(
                        cells[2]
                            .textContent
                    );


                /*
                    Current Active Trades table:

                    0 = Asset
                    1 = Type
                    2 = Entry
                    3 = Current
                    4 = Quantity
                    5 = P/L
                    6 = Status
                    7 = Action
                */

                const quantity =
                    parseFloat(
                        cells[4]
                            .textContent
                    ) || 0;


                if (
                    !entry ||
                    !quantity
                ) {
                    return;
                }


                if (
                    type === "BUY"
                ) {

                    result +=
                        (
                            simulatedPrice -
                            entry
                        ) *
                        quantity;

                }

                else if (
                    type === "SELL"
                ) {

                    result +=
                        (
                            entry -
                            simulatedPrice
                        ) *
                        quantity;
                }

            });


            return result;
        }


        function runExtraSimulation() {

            const currentPrice =
                getCurrentBTCPrice();


            const percent =
                Number(
                    document.getElementById(
                        "extraSimPercent"
                    ).value
                ) || 0;


            const newPrice =
                currentPrice *
                (
                    1 +
                    percent / 100
                );


            const estimatedPL =
                calculateEstimatedPL(
                    newPrice
                );


            document.getElementById(
                "extraSimCurrentPrice"
            ).textContent =
                "$" +
                currentPrice.toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );


            document.getElementById(
                "extraSimulatedPrice"
            ).textContent =
                "$" +
                newPrice.toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );


            const resultElement =
                document.getElementById(
                    "extraSimulatedPL"
                );


            resultElement.textContent =
                formatMoney(
                    estimatedPL
                );


            resultElement.style.color =
                estimatedPL >= 0
                    ? "#38dfac"
                    : "#ff7d87";
        }


        document
            .getElementById(
                "extraSimulateBtn"
            )
            .addEventListener(
                "click",
                runExtraSimulation
            );


        setInterval(
            runExtraSimulation,
            3000
        );

    }


    /* =====================================================
       3. SYSTEM HEALTH
    ====================================================== */

    const simulator =
        document.getElementById(
            "extraSimulator"
        );

    if (simulator) {

        const section =
            document.createElement(
                "section"
            );

        section.className =
            "extra-feature-section";

        section.id =
            "extraSystemHealth";

        section.innerHTML = `

            <div class="extra-feature-heading">

                <div>

                    <h2>
                        System Health
                    </h2>

                    <p>
                        Current status of application modules
                    </p>

                </div>

                <span class="extra-badge">
                    SYSTEM
                </span>

            </div>


            <div class="health-grid-extra">


                <div class="health-item-extra">

                    <div>

                        <strong>
                            Frontend
                        </strong>

                        <small>
                            Web Application
                        </small>

                    </div>

                    <b
                        id="extraFrontendHealth"
                        class="health-status-extra"
                    >
                        ● ONLINE
                    </b>

                </div>


                <div class="health-item-extra">

                    <div>

                        <strong>
                            Market Engine
                        </strong>

                        <small>
                            Demo price engine
                        </small>

                    </div>

                    <b
                        id="extraMarketHealth"
                        class="health-status-extra"
                    >
                        ● RUNNING
                    </b>

                </div>


                <div class="health-item-extra">

                    <div>

                        <strong>
                            AI Service
                        </strong>

                        <small>
                            Gemini Analysis
                        </small>

                    </div>

                    <b
                        id="extraAIHealth"
                        class="health-status-extra"
                    >
                        ● READY
                    </b>

                </div>


                <div class="health-item-extra">

                    <div>

                        <strong>
                            Trading Mode
                        </strong>

                        <small>
                            Execution environment
                        </small>

                    </div>

                    <b class="health-status-extra">
                        ● PAPER TRADING
                    </b>

                </div>


            </div>
        `;


        insertAfter(
            simulator,
            section
        );


        function updateExtraHealth() {

            const botText =
                document.getElementById(
                    "headerStatus"
                );


            const marketStatus =
                botText &&
                botText.textContent
                    .toLowerCase()
                    .includes(
                        "running"
                    );


            const marketElement =
                document.getElementById(
                    "extraMarketHealth"
                );


            if (marketElement) {

                marketElement.textContent =
                    marketStatus
                        ? "● RUNNING"
                        : "● STOPPED";


                marketElement.classList.toggle(
                    "offline",
                    !marketStatus
                );
            }


            const aiResponse =
                document.getElementById(
                    "aiResponse"
                );


            const aiElement =
                document.getElementById(
                    "extraAIHealth"
                );


            if (
                aiResponse &&
                aiElement
            ) {

                const text =
                    aiResponse.textContent
                        .toLowerCase();


                const unavailable =
                    text.includes(
                        "unavailable"
                    ) ||
                    text.includes(
                        "quota"
                    ) ||
                    text.includes(
                        "busy"
                    ) ||
                    text.includes(
                        "error"
                    );


                aiElement.textContent =
                    unavailable
                        ? "● UNAVAILABLE"
                        : "● READY";


                aiElement.classList.toggle(
                    "offline",
                    unavailable
                );
            }

        }


        updateExtraHealth();


        setInterval(
            updateExtraHealth,
            2000
        );
    }


    /* =====================================================
       4. UPDATE SIGNAL EXPLANATION
    ====================================================== */

    function updateSignalExplanation() {

        const signalSource =
            document.getElementById(
                "topSignal"
            );

        const trendSource =
            document.getElementById(
                "marketTrend"
            );

        const riskSource =
            document.getElementById(
                "riskLevel"
            );

        const rsiSource =
            document.getElementById(
                "rsiStatus"
            );

        const macdSource =
            document.getElementById(
                "macdStatus"
            );

        const emaSource =
            document.getElementById(
                "emaStatus"
            );

        const volatilitySource =
            document.getElementById(
                "volatilityStatus"
            );


        function setText(
            targetId,
            source
        ) {

            const target =
                document.getElementById(
                    targetId
                );


            if (
                target &&
                source
            ) {

                target.textContent =
                    source.textContent.trim();
            }
        }


        setText(
            "extraExplainSignal",
            signalSource
        );

        setText(
            "extraExplainTrend",
            trendSource
        );

        setText(
            "extraExplainRisk",
            riskSource
        );

        setText(
            "extraExplainRSI",
            rsiSource
        );

        setText(
            "extraExplainMACD",
            macdSource
        );

        setText(
            "extraExplainEMA",
            emaSource
        );

        setText(
            "extraExplainVolatility",
            volatilitySource
        );
    }


    updateSignalExplanation();


    setInterval(
        updateSignalExplanation,
        1500
    );

});