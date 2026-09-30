/* =========================================================
   CRYPTO AI TRADING BOT
   DEMO / PAPER TRADING FRONTEND
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AUTH ELEMENTS
    ====================================================== */

    const authScreen = document.getElementById("authScreen");
    const app = document.getElementById("app");

    const loginBox = document.getElementById("loginBox");
    const signupBox = document.getElementById("signupBox");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const showSignupBtn = document.getElementById("showSignupBtn");
    const showLoginBtn = document.getElementById("showLoginBtn");
    const demoLoginBtn = document.getElementById("demoLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const loginMessage = document.getElementById("loginMessage");
    const signupMessage = document.getElementById("signupMessage");

    /* =====================================================
       USER UI
    ====================================================== */

    const sidebarUserName = document.getElementById("sidebarUserName");
    const sidebarUserEmail = document.getElementById("sidebarUserEmail");
    const sidebarAvatar = document.getElementById("sidebarAvatar");

    const headerUserName = document.getElementById("headerUserName");
    const headerAvatar = document.getElementById("headerAvatar");

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileAvatar = document.getElementById("profileAvatar");

    /* =====================================================
       DASHBOARD ELEMENTS
    ====================================================== */

    const marketPriceElement = document.getElementById("marketPrice");
    const topProfitLoss = document.getElementById("topProfitLoss");
    const sideProfitLoss = document.getElementById("sideProfitLoss");

    const topSignal = document.getElementById("topSignal");
    const sideSignal = document.getElementById("sideSignal");
    const signalDescription = document.getElementById("signalDescription");

    const marketTrend = document.getElementById("marketTrend");
    const riskLevel = document.getElementById("riskLevel");

    const topBotStatus = document.getElementById("topBotStatus");
    const headerStatus = document.getElementById("headerStatus");
    const botBadge = document.getElementById("botBadge");

    const chart = document.getElementById("marketChart");

    const analyzeBtn = document.getElementById("analyzeBtn");
    const aiResponse = document.getElementById("aiResponse");

    /* =====================================================
       INDICATORS
    ====================================================== */

    const rsiValue = document.getElementById("rsiValue");
    const rsiStatus = document.getElementById("rsiStatus");

    const macdValue = document.getElementById("macdValue");
    const macdStatus = document.getElementById("macdStatus");

    const emaValue = document.getElementById("emaValue");
    const emaStatus = document.getElementById("emaStatus");

    const volatilityValue = document.getElementById("volatilityValue");
    const volatilityStatus = document.getElementById("volatilityStatus");

    /* =====================================================
       PORTFOLIO
    ====================================================== */

    const totalBalanceElement = document.getElementById("totalBalance");
    const availableBalanceElement = document.getElementById("availableBalance");
    const investedBalanceElement = document.getElementById("investedBalance");
    const portfolioPLElement = document.getElementById("portfolioPL");

    const activeTradeCountElement = document.getElementById("activeTradeCount");
    const historyTradeCountElement = document.getElementById("historyTradeCount");
    const winRateElement = document.getElementById("winRate");

    /* =====================================================
       TRADE FORM
    ====================================================== */

    const tradeAsset = document.getElementById("tradeAsset");
    const tradeQuantity = document.getElementById("tradeQuantity");
    const tradeCurrentPrice = document.getElementById("tradeCurrentPrice");
    const tradeEstimatedAmount = document.getElementById("tradeEstimatedAmount");

    const buyBtn = document.getElementById("buyBtn");
    const sellBtn = document.getElementById("sellBtn");
    const placeTradeBtn = document.getElementById("placeTradeBtn");
    const tradeMessage = document.getElementById("tradeMessage");

    /* =====================================================
       TABLES
    ====================================================== */

    const activeTradesBody = document.getElementById("activeTradesBody");
    const tradeHistoryBody = document.getElementById("tradeHistoryBody");

    /* =====================================================
       MARKETS / WATCHLIST
    ====================================================== */

    const marketGrid = document.getElementById("marketGrid");

    const watchAsset = document.getElementById("watchAsset");
    const addWatchBtn = document.getElementById("addWatchBtn");
    const watchlistGrid = document.getElementById("watchlistGrid");

    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    const notificationList = document.getElementById("notificationList");

    /* =====================================================
       SETTINGS
    ====================================================== */

    const botToggle = document.getElementById("botToggle");
    const notificationToggle = document.getElementById("notificationToggle");
    const resetDemoBtn = document.getElementById("resetDemoBtn");

    /* =====================================================
       VARIABLES
    ====================================================== */

    const INITIAL_BALANCE = 100000;

    let marketPrices = {
        "BTC/USD": 60017.65,
        "ETH/USD": 2515.40,
        "SOL/USD": 145.20,
        "XRP/USD": 0.58
    };

    let botRunning = true;
    let notificationsEnabled = true;

    let selectedTradeType = "BUY";

    let activeTrades = [
        {
            id: 1,
            asset: "BTC/USD",
            type: "BUY",
            entry: 59820.00,
            quantity: 0.10,
            status: "ACTIVE"
        }
    ];

    let tradeHistory = [
        {
            asset: "ETH/USD",
            type: "SELL",
            entry: 2540.00,
            exit: 2515.40,
            quantity: 0.50,
            pnl: -12.30,
            status: "CLOSED"
        },
        {
            asset: "BTC/USD",
            type: "BUY",
            entry: 59450.00,
            exit: 60017.65,
            quantity: 0.05,
            pnl: 28.84,
            status: "CLOSED"
        }
    ];

    let watchlist = [
        "BTC/USD",
        "ETH/USD"
    ];

    let notifications = [
        {
            title: "Bot started",
            text: "Demo trading bot is monitoring the market.",
            time: "Just now"
        },
        {
            title: "BTC/USD active",
            text: "An active demo position is running.",
            time: "2 min ago"
        }
    ];

    let priceHistory = [];

    let realizedPL = tradeHistory.reduce(
        (sum, trade) => sum + trade.pnl,
        0
    );

    /* =====================================================
       HELPERS
    ====================================================== */

    function formatMoney(value) {

        const sign = value >= 0 ? "+" : "-";

        return (
            sign +
            "$" +
            Math.abs(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        );
    }

    function formatPrice(value) {

        if (value < 1) {
            return (
                "$" +
                value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4
                })
            );
        }

        return (
            "$" +
            value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        );
    }

    function getAvatar(name) {
        return (
            name &&
            name.trim().length
                ? name.trim().charAt(0).toUpperCase()
                : "U"
        );
    }

    function showMessage(element, text, type) {

        if (!element) return;

        element.textContent = text;

        element.classList.remove(
            "auth-error",
            "auth-success"
        );

        if (type === "error") {
            element.classList.add("auth-error");
        }

        if (type === "success") {
            element.classList.add("auth-success");
        }
    }

    /* =====================================================
       PASSWORD HASH
    ====================================================== */

    async function hashPassword(password) {

        try {

            if (
                window.crypto &&
                window.crypto.subtle
            ) {

                const encoder =
                    new TextEncoder();

                const data =
                    encoder.encode(password);

                const hash =
                    await crypto.subtle.digest(
                        "SHA-256",
                        data
                    );

                return Array.from(
                    new Uint8Array(hash)
                )
                    .map(byte =>
                        byte
                            .toString(16)
                            .padStart(2, "0")
                    )
                    .join("");

            }

        } catch (error) {

            console.warn(
                "Crypto hash unavailable:",
                error
            );
        }

        return btoa(unescape(encodeURIComponent(password)));
    }

    /* =====================================================
       AUTH SCREENS
    ====================================================== */

    function showLogin() {

        loginBox.classList.remove("hidden");
        signupBox.classList.add("hidden");

        showMessage(
            loginMessage,
            "",
            ""
        );

        showMessage(
            signupMessage,
            "",
            ""
        );
    }

    function showSignup() {

        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");

        showMessage(
            loginMessage,
            "",
            ""
        );

        showMessage(
            signupMessage,
            "",
            ""
        );
    }

    function showApp() {

        authScreen.classList.add("hidden");
        app.classList.remove("hidden");

        loadUserIntoUI();
        renderAll();

    }

    function showAuth() {

        app.classList.add("hidden");
        authScreen.classList.remove("hidden");

        showLogin();
    }

    /* =====================================================
       USER STORAGE
    ====================================================== */

    function saveUser(user) {
        localStorage.setItem(
            "cryptoBotUser",
            JSON.stringify(user)
        );
    }

    function getSavedUser() {

        try {

            const user =
                localStorage.getItem(
                    "cryptoBotUser"
                );

            return user
                ? JSON.parse(user)
                : null;

        } catch (error) {

            return null;
        }
    }

    function isLoggedIn() {
        return (
            localStorage.getItem(
                "cryptoBotSession"
            ) === "true"
        );
    }

    function loadUserIntoUI() {

        const user =
            getSavedUser();

        if (!user) return;

        const avatar =
            getAvatar(user.name);

        sidebarUserName.textContent =
            user.name;

        sidebarUserEmail.textContent =
            user.email;

        headerUserName.textContent =
            user.name;

        profileName.textContent =
            user.name;

        profileEmail.textContent =
            user.email;

        sidebarAvatar.textContent =
            avatar;

        headerAvatar.textContent =
            avatar;

        profileAvatar.textContent =
            avatar;
    }

    /* =====================================================
       LOGIN
    ====================================================== */

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            if (!email || !password) {

                showMessage(
                    loginMessage,
                    "Please fill all fields.",
                    "error"
                );

                return;
            }

            const savedUser =
                getSavedUser();

            if (!savedUser) {

                showMessage(
                    loginMessage,
                    "No account found. Please sign up first.",
                    "error"
                );

                return;
            }

            const passwordHash =
                await hashPassword(password);

            if (
                savedUser.email !== email ||
                savedUser.passwordHash !== passwordHash
            ) {

                showMessage(
                    loginMessage,
                    "Invalid email or password.",
                    "error"
                );

                return;
            }

            localStorage.setItem(
                "cryptoBotSession",
                "true"
            );

            showMessage(
                loginMessage,
                "Login successful.",
                "success"
            );

            setTimeout(
                showApp,
                250
            );
        }
    );

    /* =====================================================
       SIGNUP
    ====================================================== */

    signupForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("signupConfirmPassword")
                    .value;

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    signupMessage,
                    "Please fill all fields.",
                    "error"
                );

                return;
            }

            if (password !== confirmPassword) {

                showMessage(
                    signupMessage,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }

            if (password.length < 6) {

                showMessage(
                    signupMessage,
                    "Password should be at least 6 characters.",
                    "error"
                );

                return;
            }

            const passwordHash =
                await hashPassword(password);

            saveUser({
                name,
                email,
                passwordHash
            });

            showMessage(
                signupMessage,
                "Account created successfully. Please login.",
                "success"
            );

            signupForm.reset();

            setTimeout(
                showLogin,
                700
            );
        }
    );

    /* =====================================================
       DEMO LOGIN
    ====================================================== */

    demoLoginBtn.addEventListener(
        "click",
        () => {

            saveUser({
                name: "Demo User",
                email: "demo@cryptobot.local",
                passwordHash: ""
            });

            localStorage.setItem(
                "cryptoBotSession",
                "true"
            );

            showApp();
        }
    );

    /* =====================================================
       LOGOUT
    ====================================================== */

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "cryptoBotSession"
            );

            showAuth();
        }
    );

    showSignupBtn.addEventListener(
        "click",
        showSignup
    );

    showLoginBtn.addEventListener(
        "click",
        showLogin
    );


    /* =====================================================
       SIDEBAR NAVIGATION
    ====================================================== */

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const targetId =
                        button.dataset.target;

                    let target;

                    if (
                        targetId ===
                        "marketsSection"
                    ) {

                        target =
                            document.getElementById(
                                "marketsSection"
                            );

                    } else {

                        target =
                            document.getElementById(
                                targetId
                            );
                    }

                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }

                    document
                        .querySelectorAll(".nav-btn")
                        .forEach(nav =>
                            nav.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );
                }
            );
        });


    /* =====================================================
       MARKET PRICE
    ====================================================== */

    function updateMarketPrices() {

        if (!botRunning) return;

        Object.keys(marketPrices)
            .forEach(asset => {

                const movement =
                    asset === "XRP/USD"
                        ? (Math.random() - 0.5) * 0.015
                        : asset === "SOL/USD"
                            ? (Math.random() - 0.5) * 1.5
                            : (Math.random() - 0.5) * 25;

                marketPrices[asset] +=
                    movement;

                marketPrices[asset] =
                    Math.max(
                        asset === "XRP/USD"
                            ? 0.10
                            : 1,
                        marketPrices[asset]
                    );
            });

        marketPriceElement.textContent =
            formatPrice(
                marketPrices["BTC/USD"]
            );

        tradeCurrentPrice.textContent =
            formatPrice(
                marketPrices[
                    tradeAsset.value
                ]
            );

        updateTradeEstimate();
        updateActiveTradePrices();
        updatePortfolio();
        renderMarkets();
        renderWatchlist();
        updateChart();
    }

    setInterval(
        updateMarketPrices,
        3000
    );


    /* =====================================================
       P/L CALCULATION
    ====================================================== */

    function calculateActivePL() {

        return activeTrades.reduce(
            (sum, trade) => {

                const current =
                    marketPrices[
                        trade.asset
                    ];

                let pnl = 0;

                if (trade.type === "BUY") {

                    pnl =
                        (current -
                            trade.entry) *
                        trade.quantity;

                } else {

                    pnl =
                        (trade.entry -
                            current) *
                        trade.quantity;
                }

                return sum + pnl;

            },
            0
        );
    }

    function getTotalPL() {

        return (
            realizedPL +
            calculateActivePL()
        );
    }


    /* =====================================================
       PORTFOLIO
    ====================================================== */

    function updatePortfolio() {

        const invested =
            activeTrades.reduce(
                (sum, trade) =>
                    sum +
                    (
                        trade.entry *
                        trade.quantity
                    ),
                0
            );

        const available =
            INITIAL_BALANCE -
            invested;

        const totalPL =
            getTotalPL();

        const totalBalance =
            INITIAL_BALANCE +
            totalPL;

        totalBalanceElement.textContent =
            "$" +
            totalBalance.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

        availableBalanceElement.textContent =
            "$" +
            available.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

        investedBalanceElement.textContent =
            "$" +
            invested.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

        portfolioPLElement.textContent =
            formatMoney(totalPL);

        portfolioPLElement.classList.remove(
            "profit",
            "loss"
        );

        portfolioPLElement.classList.add(
            totalPL >= 0
                ? "profit"
                : "loss"
        );

        topProfitLoss.textContent =
            formatMoney(totalPL);

        sideProfitLoss.textContent =
            formatMoney(
                calculateActivePL()
            );

        topProfitLoss.classList.remove(
            "profit",
            "loss"
        );

        sideProfitLoss.classList.remove(
            "profit",
            "loss"
        );

        topProfitLoss.classList.add(
            totalPL >= 0
                ? "profit"
                : "loss"
        );

        sideProfitLoss.classList.add(
            calculateActivePL() >= 0
                ? "profit"
                : "loss"
        );

        activeTradeCountElement.textContent =
            activeTrades.length;

        historyTradeCountElement.textContent =
            tradeHistory.length;

        updateWinRate();
    }


    function updateWinRate() {

        if (!tradeHistory.length) {

            winRateElement.textContent =
                "0%";

            return;
        }

        const wins =
            tradeHistory.filter(
                trade => trade.pnl > 0
            ).length;

        const rate =
            Math.round(
                (wins /
                    tradeHistory.length) *
                100
            );

        winRateElement.textContent =
            rate + "%";
    }


    /* =====================================================
       TRADE FORM
    ====================================================== */

    function updateTradeEstimate() {

        const price =
            marketPrices[
                tradeAsset.value
            ];

        const quantity =
            Number(
                tradeQuantity.value
            ) || 0;

        tradeCurrentPrice.textContent =
            formatPrice(price);

        tradeEstimatedAmount.textContent =
            "$" +
            (
                price *
                quantity
            ).toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }

    tradeAsset.addEventListener(
        "change",
        updateTradeEstimate
    );

    tradeQuantity.addEventListener(
        "input",
        updateTradeEstimate
    );


    buyBtn.addEventListener(
        "click",
        () => {

            selectedTradeType =
                "BUY";

            buyBtn.classList.add(
                "buy-selected"
            );

            sellBtn.classList.remove(
                "sell-selected"
            );
        }
    );


    sellBtn.addEventListener(
        "click",
        () => {

            selectedTradeType =
                "SELL";

            sellBtn.classList.add(
                "sell-selected"
            );

            buyBtn.classList.remove(
                "buy-selected"
            );
        }
    );


    placeTradeBtn.addEventListener(
        "click",
        () => {

            const asset =
                tradeAsset.value;

            const quantity =
                Number(
                    tradeQuantity.value
                );

            if (
                !quantity ||
                quantity <= 0
            ) {

                tradeMessage.textContent =
                    "Enter a valid quantity.";

                return;
            }

            const price =
                marketPrices[asset];

            const invested =
                price * quantity;

            const currentInvested =
                activeTrades.reduce(
                    (sum, trade) =>
                        sum +
                        (
                            trade.entry *
                            trade.quantity
                        ),
                    0
                );

            if (
                currentInvested +
                invested >
                INITIAL_BALANCE
            ) {

                tradeMessage.textContent =
                    "Insufficient demo balance.";

                return;
            }

            const newTrade = {

                id:
                    Date.now(),

                asset,

                type:
                    selectedTradeType,

                entry:
                    price,

                quantity,

                status:
                    "ACTIVE"
            };

            activeTrades.push(
                newTrade
            );

            tradeMessage.textContent =
                `${selectedTradeType} demo trade opened successfully.`;

            addNotification(
                "Trade opened",
                `${selectedTradeType} ${asset} position opened at ${formatPrice(price)}.`
            );

            renderAll();

            setTimeout(
                () => {
                    tradeMessage.textContent = "";
                },
                2500
            );
        }
    );


    /* =====================================================
       ACTIVE TRADES
    ====================================================== */

    function calculateTradePL(trade) {

        const current =
            marketPrices[
                trade.asset
            ];

        if (trade.type === "BUY") {

            return (
                current -
                trade.entry
            ) * trade.quantity;

        }

        return (
            trade.entry -
            current
        ) * trade.quantity;
    }


    function renderActiveTrades() {

        if (!activeTradesBody) return;

        if (!activeTrades.length) {

            activeTradesBody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-row">
                        No active trades. Place a demo trade to get started.
                    </td>
                </tr>
            `;

            return;
        }

        activeTradesBody.innerHTML =
            activeTrades.map(trade => {

                const current =
                    marketPrices[
                        trade.asset
                    ];

                const pnl =
                    calculateTradePL(
                        trade
                    );

                const pnlClass =
                    pnl >= 0
                        ? "trade-profit"
                        : "trade-loss";

                return `
                    <tr>

                        <td>${trade.asset}</td>

                        <td>
                            <span class="${
                                trade.type === "BUY"
                                    ? "trade-buy"
                                    : "trade-sell"
                            }">
                                ${trade.type}
                            </span>
                        </td>

                        <td>
                            ${formatPrice(trade.entry)}
                        </td>

                        <td>
                            ${formatPrice(current)}
                        </td>

                        <td>
                            ${trade.quantity}
                        </td>

                        <td class="${pnlClass}">
                            ${formatMoney(pnl)}
                        </td>

                        <td>
                            <span class="trade-active">
                                ACTIVE
                            </span>
                        </td>

                        <td>
                            <button
                                class="close-trade-btn"
                                onclick="closeTrade(${trade.id})"
                            >
                                Close
                            </button>
                        </td>

                    </tr>
                `;

            }).join("");
    }


    window.closeTrade =
        function (tradeId) {

            const index =
                activeTrades.findIndex(
                    trade =>
                        trade.id ===
                        tradeId
                );

            if (index === -1) return;

            const trade =
                activeTrades[index];

            const exit =
                marketPrices[
                    trade.asset
                ];

            const pnl =
                calculateTradePL(
                    trade
                );

            tradeHistory.unshift({
                asset: trade.asset,
                type: trade.type,
                entry: trade.entry,
                exit,
                quantity: trade.quantity,
                pnl,
                status: "CLOSED"
            });

            realizedPL += pnl;

            activeTrades.splice(
                index,
                1
            );

            addNotification(
                "Trade closed",
                `${trade.asset} position closed with ${formatMoney(pnl)} P/L.`
            );

            renderAll();
        };


    function updateActiveTradePrices() {

        renderActiveTrades();
    }


    /* =====================================================
       TRADE HISTORY
    ====================================================== */

    function renderTradeHistory() {

        if (!tradeHistoryBody) return;

        if (!tradeHistory.length) {

            tradeHistoryBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-row">
                        No completed trades yet.
                    </td>
                </tr>
            `;

            return;
        }

        tradeHistoryBody.innerHTML =
            tradeHistory.map(
                trade => {

                    const pnlClass =
                        trade.pnl >= 0
                            ? "trade-profit"
                            : "trade-loss";

                    return `
                        <tr>

                            <td>${trade.asset}</td>

                            <td>
                                <span class="${
                                    trade.type === "BUY"
                                        ? "trade-buy"
                                        : "trade-sell"
                                }">
                                    ${trade.type}
                                </span>
                            </td>

                            <td>
                                ${formatPrice(trade.entry)}
                            </td>

                            <td>
                                ${formatPrice(trade.exit)}
                            </td>

                            <td>
                                ${trade.quantity}
                            </td>

                            <td class="${pnlClass}">
                                ${formatMoney(trade.pnl)}
                            </td>

                            <td>
                                <span class="trade-closed">
                                    CLOSED
                                </span>
                            </td>

                        </tr>
                    `;
                }
            ).join("");
    }


    /* =====================================================
       MARKETS
    ====================================================== */

    function renderMarkets() {

        if (!marketGrid) return;

        const assets =
            Object.keys(
                marketPrices
            );

        marketGrid.innerHTML =
            assets.map(
                asset => {

                    const price =
                        marketPrices[
                            asset
                        ];

                    return `
                        <div class="market-item">

                            <div class="market-item-top">

                                <span class="market-name">
                                    ${asset}
                                </span>

                                <span class="trade-buy">
                                    LIVE
                                </span>

                            </div>

                            <div class="market-price">
                                ${formatPrice(price)}
                            </div>

                            <div class="market-meta">
                                AI Signal: HOLD
                            </div>

                            <button
                                class="market-add-btn"
                                onclick="quickWatch('${asset}')"
                            >
                                + Add to Watchlist
                            </button>

                        </div>
                    `;
                }
            ).join("");
    }


    window.quickWatch =
        function (asset) {

            if (
                !watchlist.includes(
                    asset
                )
            ) {

                watchlist.push(
                    asset
                );

                addNotification(
                    "Watchlist updated",
                    `${asset} added to your watchlist.`
                );

                renderWatchlist();
            }
        };


    /* =====================================================
       WATCHLIST
    ====================================================== */

    function renderWatchlist() {

        if (!watchlistGrid) return;

        if (!watchlist.length) {

            watchlistGrid.innerHTML = `
                <div class="watch-item">
                    <h3>No assets</h3>
                    <p>Add an asset to your watchlist.</p>
                </div>
            `;

            return;
        }

        watchlistGrid.innerHTML =
            watchlist.map(
                asset => {

                    return `
                        <div class="watch-item">

                            <h3>${asset}</h3>

                            <p>
                                Demo market price
                            </p>

                            <div class="watch-price">
                                ${formatPrice(
                                    marketPrices[asset]
                                )}
                            </div>

                            <p>
                                Signal: HOLD
                            </p>

                        </div>
                    `;
                }
            ).join("");
    }


    addWatchBtn.addEventListener(
        "click",
        () => {

            const asset =
                watchAsset.value;

            if (
                !watchlist.includes(
                    asset
                )
            ) {

                watchlist.push(
                    asset
                );

                addNotification(
                    "Watchlist updated",
                    `${asset} added successfully.`
                );

                renderWatchlist();

            } else {

                addNotification(
                    "Watchlist",
                    `${asset} is already in your watchlist.`
                );
            }
        }
    );


    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    function addNotification(
        title,
        text
    ) {

        if (!notificationsEnabled) {
            return;
        }

        notifications.unshift({

            title,
            text,
            time: "Just now"

        });

        notifications =
            notifications.slice(
                0,
                8
            );

        renderNotifications();
    }


    function renderNotifications() {

        notificationList.innerHTML =
            notifications.map(
                note => {

                    return `
                        <div class="notification-item">

                            <div class="notification-content">

                                <strong>
                                    ${note.title}
                                </strong>

                                <p>
                                    ${note.text}
                                </p>

                            </div>

                            <span class="notification-time">
                                ${note.time}
                            </span>

                        </div>
                    `;
                }
            ).join("");
    }


    /* =====================================================
       BOT STATUS
    ====================================================== */

    function updateBotStatus() {

        if (botRunning) {

            headerStatus.textContent =
                "Bot Running";

            topBotStatus.textContent =
                "RUNNING";

            topBotStatus.className =
                "running";

            botBadge.innerHTML =
                "<span></span> RUNNING";

        } else {

            headerStatus.textContent =
                "Bot Offline";

            topBotStatus.textContent =
                "OFFLINE";

            topBotStatus.className =
                "loss";

            botBadge.innerHTML =
                "<span></span> OFFLINE";
        }
    }


    botToggle.addEventListener(
        "change",
        () => {

            botRunning =
                botToggle.checked;

            updateBotStatus();

            addNotification(
                "Bot status changed",
                botRunning
                    ? "Trading bot is now running."
                    : "Trading bot has been stopped."
            );
        }
    );


    notificationToggle.addEventListener(
        "change",
        () => {

            notificationsEnabled =
                notificationToggle.checked;

            if (notificationsEnabled) {

                addNotification(
                    "Notifications enabled",
                    "You will now receive demo activity alerts."
                );
            }
        }
    );


    /* =====================================================
       INDICATORS
    ====================================================== */

    function updateIndicators() {

        const rsi =
            35 +
            Math.random() * 30;

        const macd =
            (Math.random() - 0.5) * 0.8;

        const ema =
            marketPrices[
                "BTC/USD"
            ] -
            150 +
            Math.random() * 300;

        const volatility =
            1.4 +
            Math.random() * 2.8;

        rsiValue.textContent =
            rsi.toFixed(1);

        if (rsi > 70) {

            rsiStatus.textContent =
                "Overbought";

        } else if (rsi < 30) {

            rsiStatus.textContent =
                "Oversold";

        } else {

            rsiStatus.textContent =
                "Neutral";
        }

        macdValue.textContent =
            (macd >= 0 ? "+" : "") +
            macd.toFixed(2);

        macdStatus.textContent =
            macd >= 0
                ? "Bullish"
                : "Bearish";

        emaValue.textContent =
            formatPrice(ema);

        emaStatus.textContent =
            marketPrices["BTC/USD"] >= ema
                ? "Price Above EMA"
                : "Price Below EMA";

        volatilityValue.textContent =
            volatility.toFixed(1) +
            "%";

        volatilityStatus.textContent =
            volatility > 3.2
                ? "High"
                : volatility > 2
                    ? "Medium"
                    : "Low";
    }

    setInterval(
        updateIndicators,
        5000
    );


    /* =====================================================
       CHART
    ====================================================== */

    let ctx = null;

    if (chart) {
        ctx =
            chart.getContext("2d");
    }

    function initializeChartData() {

        priceHistory = [];

        let price =
            marketPrices["BTC/USD"];

        for (
            let i = 0;
            i < 30;
            i++
        ) {

            price +=
                (Math.random() - 0.5) * 80;

            priceHistory.push(
                price
            );
        }
    }


    function updateChart() {

        if (!ctx || !chart) {
            return;
        }

        const width =
            chart.width =
                chart.clientWidth *
                window.devicePixelRatio;

        const height =
            chart.height =
                chart.clientHeight *
                window.devicePixelRatio;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        const current =
            marketPrices["BTC/USD"];

        priceHistory.push(
            current
        );

        if (
            priceHistory.length >
            30
        ) {

            priceHistory.shift();
        }

        const min =
            Math.min(
                ...priceHistory
            ) - 100;

        const max =
            Math.max(
                ...priceHistory
            ) + 100;

        function getX(index) {

            return (
                index /
                (priceHistory.length - 1)
            ) * width;
        }

        function getY(value) {

            return (
                height -
                (
                    (value - min) /
                    (max - min)
                ) *
                height
            );
        }


        // Grid
        ctx.strokeStyle =
            "rgba(80, 130, 120, 0.10)";

        ctx.lineWidth = 1;

        for (
            let i = 1;
            i < 5;
            i++
        ) {

            const y =
                (height / 5) *
                i;

            ctx.beginPath();

            ctx.moveTo(
                0,
                y
            );

            ctx.lineTo(
                width,
                y
            );

            ctx.stroke();
        }


        // Line
        ctx.beginPath();

        priceHistory.forEach(
            (value, index) => {

                const x =
                    getX(index);

                const y =
                    getY(value);

                if (index === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                } else {

                    ctx.lineTo(
                        x,
                        y
                    );
                }
            }
        );

        ctx.strokeStyle =
            "#32dfad";

        ctx.lineWidth =
            3;

        ctx.shadowColor =
            "rgba(50, 223, 173, 0.25)";

        ctx.shadowBlur =
            10;

        ctx.stroke();

        ctx.shadowBlur =
            0;


        // Current Point
        const lastX =
            getX(
                priceHistory.length - 1
            );

        const lastY =
            getY(current);

        ctx.beginPath();

        ctx.arc(
            lastX,
            lastY,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#39e1b0";

        ctx.fill();
    }

    window.addEventListener(
        "resize",
        updateChart
    );


    /* =====================================================
       AI ANALYSIS
    ====================================================== */

    function extractSignal(text) {

        const content =
            String(text)
                .toUpperCase();

        if (
            content.includes("BUY")
        ) {

            return "BUY";
        }

        if (
            content.includes("SELL")
        ) {

            return "SELL";
        }

        return "HOLD";
    }


    function extractTrend(text) {

        const content =
            String(text)
                .toUpperCase();

        if (
            content.includes(
                "BULLISH"
            )
        ) {

            return "BULLISH";
        }

        if (
            content.includes(
                "BEARISH"
            )
        ) {

            return "BEARISH";
        }

        return "NEUTRAL";
    }


    function extractRisk(text) {

        const content =
            String(text)
                .toUpperCase();

        if (
            content.includes(
                "HIGH RISK"
            )
        ) {

            return "HIGH";
        }

        if (
            content.includes(
                "MEDIUM RISK"
            )
        ) {

            return "MEDIUM";
        }

        if (
            content.includes(
                "LOW RISK"
            )
        ) {

            return "LOW";
        }

        return "LOW";
    }


    function setSignal(signal) {

        const elements = [
            topSignal,
            sideSignal
        ];

        elements.forEach(
            element => {

                if (!element) return;

                element.textContent =
                    signal;

                element.classList.remove(
                    "buy",
                    "sell",
                    "hold"
                );

                if (
                    signal === "BUY"
                ) {

                    element.classList.add(
                        "buy"
                    );

                } else if (
                    signal === "SELL"
                ) {

                    element.classList.add(
                        "sell"
                    );

                } else {

                    element.classList.add(
                        "hold"
                    );
                }
            }
        );


        if (
            signal === "BUY"
        ) {

            signalDescription.textContent =
                "AI indicates positive momentum. Demo buy conditions are being monitored.";

        } else if (
            signal === "SELL"
        ) {

            signalDescription.textContent =
                "AI indicates negative momentum. Demo sell conditions are being monitored.";

        } else {

            signalDescription.textContent =
                "Market is in consolidation. Waiting for clearer movement.";
        }
    }


    if (analyzeBtn) {

        analyzeBtn.addEventListener(
            "click",
            async () => {

                analyzeBtn.disabled =
                    true;

                analyzeBtn.textContent =
                    "Analyzing...";

                aiResponse.textContent =
                    "AI is analyzing the current BTC/USD market...";

                try {

                    const marketData = {

                        asset:
                            "BTC/USD",

                        price:
                            Number(
                                marketPrices[
                                    "BTC/USD"
                                ].toFixed(2)
                            ),

                        profitLoss:
                            Number(
                                getTotalPL()
                                    .toFixed(2)
                            ),

                        botStatus:
                            botRunning
                                ? "RUNNING"
                                : "OFFLINE"
                    };


                    const response =
                        await fetch(
                            "http://localhost:3000/api/analyze",
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        marketData
                                    })
                            }
                        );


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.error ||
                            "AI analysis failed"
                        );
                    }


                    const analysis =
                        data.analysis ||
                        "No analysis available.";


                    aiResponse.textContent =
                        analysis;


                    const signal =
                        extractSignal(
                            analysis
                        );

                    const trend =
                        extractTrend(
                            analysis
                        );

                    const risk =
                        extractRisk(
                            analysis
                        );


                    setSignal(
                        signal
                    );

                    marketTrend.textContent =
                        trend;

                    riskLevel.textContent =
                        risk;

                    addNotification(
                        "AI analysis completed",
                        `Current AI signal: ${signal}.`
                    );

                } catch (error) {

                    console.error(
                        "AI ERROR:",
                        error
                    );


                    if (
                        error.message.includes(
                            "429"
                        )
                    ) {

                        aiResponse.textContent =
                            "AI quota is temporarily exhausted. Please wait and try again later.";

                    } else if (
                        error.message.includes(
                            "503"
                        )
                    ) {

                        aiResponse.textContent =
                            "AI service is temporarily busy. Please try again.";

                    } else {

                        aiResponse.textContent =
                            "AI service is unavailable. Please check that your backend server is running.";
                    }

                } finally {

                    analyzeBtn.disabled =
                        false;

                    analyzeBtn.textContent =
                        "✦ Analyze Market";
                }
            }
        );
    }


    /* =====================================================
       RESET DEMO
    ====================================================== */

    resetDemoBtn.addEventListener(
        "click",
        () => {

            marketPrices = {

                "BTC/USD": 60017.65,
                "ETH/USD": 2515.40,
                "SOL/USD": 145.20,
                "XRP/USD": 0.58
            };

            activeTrades = [

                {
                    id: 1,
                    asset: "BTC/USD",
                    type: "BUY",
                    entry: 59820.00,
                    quantity: 0.10,
                    status: "ACTIVE"
                }
            ];

            tradeHistory = [

                {
                    asset: "ETH/USD",
                    type: "SELL",
                    entry: 2540.00,
                    exit: 2515.40,
                    quantity: 0.50,
                    pnl: -12.30,
                    status: "CLOSED"
                },

                {
                    asset: "BTC/USD",
                    type: "BUY",
                    entry: 59450.00,
                    exit: 60017.65,
                    quantity: 0.05,
                    pnl: 28.84,
                    status: "CLOSED"
                }
            ];

            realizedPL =
                tradeHistory.reduce(
                    (sum, trade) =>
                        sum + trade.pnl,
                    0
                );

            notifications = [

                {
                    title: "Demo reset",
                    text: "Demo account has been restored.",
                    time: "Just now"
                }
            ];

            renderAll();
        }
    );


    /* =====================================================
       RENDER ALL
    ====================================================== */

    function renderAll() {

        loadUserIntoUI();

        renderMarkets();

        renderWatchlist();

        renderActiveTrades();

        renderTradeHistory();

        renderNotifications();

        updatePortfolio();

        updateBotStatus();

        updateTradeEstimate();

        updateIndicators();

        initializeChartData();

        updateChart();
    }


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    if (isLoggedIn()) {

        showApp();

    } else {

        showAuth();
    }

});