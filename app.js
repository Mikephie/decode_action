// 专业AADecode插件
            (function () {
                const module = { exports: {} };

                function extractHeader(code) {
                    const aaStartIndex = code.search(/ﾟωﾟﾉ\s*=|ﾟдﾟ\s*=|ﾟДﾟ\s*=|ﾟΘﾟ\s*=/);

                    if (aaStartIndex > 0) {
                        const header = code.substring(0, aaStartIndex).trim();
                        const encodedPart = code.substring(aaStartIndex);
                        return { header, encodedPart };
                    }

                    return { header: "", encodedPart: code };
                }

                function plugin(code) {
                    try {
                        const { header, encodedPart } = extractHeader(code);

                        if (!(encodedPart.includes("ﾟДﾟ") || encodedPart.includes("(ﾟΘﾟ)") || encodedPart.includes("ﾟωﾟﾉ") || encodedPart.includes("ﾟдﾟ"))) {
                            return null;
                        }

                        let decodePart = encodedPart;
                        decodePart = decodePart.replace(") ('_')", "");
                        decodePart = decodePart.replace("(ﾟДﾟ) ['_'] (", "return ");

                        const x = new Function(decodePart);
                        const decodedContent = x();

                        if (header) {
                            return `${header}\n\n${decodedContent}`;
                        }

                        return decodedContent;
                    } catch (error) {
                        console.error("AADecode解码错误:", error);
                        return null;
                    }
                }

                module.exports = plugin;

                window.DecodePlugins = window.DecodePlugins || {};
                window.DecodePlugins.aadecode = {
                    detect: function (code) {
                        return code.includes("ﾟωﾟﾉ") || code.includes("ﾟДﾟ") || code.includes("ﾟдﾟ") || code.includes("ﾟΘﾟ");
                    },
                    plugin: function (code) {
                        try {
                            console.log("尝试解密AADecode编码...");
                            const result = module.exports(code);
                            return result !== null ? result : code;
                        } catch (e) {
                            console.error("AADecode插件错误:", e);
                            return code;
                        }
                    },
                };

                window.professionalAADecode = module.exports;
                console.log("专业AADecode插件已加载");
            })();

            /**
             * Eval解包工具包装器 - 将Eval解包工具转换为浏览器可用版本
             */
            // 创建自执行函数来隔离作用域
            (function () {
                // 模拟Node.js环境
                const module = { exports: {} };
                const exports = module.exports;

                // 以下粘贴原始eval-decoder.js插件代码
                // ====== 开始: 原始eval-decoder.js代码 ======

                /**
                 * 解包eval加密的代码
                 * @param {string} code - 要解包的代码
                 * @returns {string|null} - 解包后的代码或null（解包失败时）
                 */
                function plugin(code) {
                    try {
                        // 如果不包含eval，直接返回null
                        if (!code.includes("eval(") && !code.includes("eval (")) {
                            return null;
                        }

                        // 替换eval为一个捕获函数
                        let modifiedCode = code.replace(/eval\s*\(/g, "(function(x) { return x; })(");

                        // 尝试执行修改后的代码获取eval的参数
                        try {
                            // 创建一个执行环境
                            const env = {
                                window: {},
                                document: {},
                                navigator: { userAgent: "Mozilla/5.0" },
                                location: {},
                            };

                            // 执行代码
                            const result = Function("window", "document", "navigator", "location", `return ${modifiedCode}`)(env.window, env.document, env.navigator, env.location);

                            // 如果结果是字符串且包含eval，递归解包
                            if (typeof result === "string") {
                                if (result.includes("eval(")) {
                                    return plugin(result);
                                }
                                return result;
                            }

                            return String(result);
                        } catch (err) {
                            console.log("执行替换eval的方法失败，尝试直接替换方法");

                            // 尝试直接替换eval
                            try {
                                modifiedCode = code.replace(/eval\s*\(/g, "(");
                                return modifiedCode;
                            } catch (replaceErr) {
                                console.error("直接替换eval方法也失败:", replaceErr);
                                return null;
                            }
                        }
                    } catch (error) {
                        console.error("Eval解包发生错误:", error);
                        return null;
                    }
                }

                // 导出插件接口
                exports.plugin = function (code) {
                    return plugin(code);
                };

                // ====== 结束: 原始eval-decoder.js代码 ======

                // 将插件注册到全局解密插件库
                window.DecodePlugins = window.DecodePlugins || {};
                window.DecodePlugins.eval = {
                    detect: function (code) {
                        // 检测是否包含eval调用
                        return code.includes("eval(") || code.includes("eval (");
                    },
                    plugin: function (code) {
                        // 使用原始模块的功能
                        return module.exports.plugin(code);
                    },
                };

                console.log("Eval解包插件已加载");
            })();

            // 应用配置
            const APP_CONFIG = {
                VERSION: "7.0",
                VERSION_NAME: "增强版AADecode+Eval解密工具",
                UPDATE_NOTES: "集成专业AADecode和Eval解包插件，支持头部注释保留和智能检测",
            };

            window.appData = {
                token: localStorage.getItem("github_token") || "",
                repo: localStorage.getItem("repo_name") || "",
                isAAEncodeMode: false,
                isEvalMode: false,
                lastDetection: null,
            };

            // 检测函数
            function detectAAEncode(input) {
                const aaencodeChars = /[ﾟωノΘΔДεｰｍ'∇｀~┻━_=3o\^c\/\*\\\"()[\]!+]/g;
                const matches = input.match(aaencodeChars) || [];
                const ratio = matches.length / input.length;

                const aaencodePatterns = [/ﾟωﾟﾉ/, /ﾟｰﾟ/, /ﾟΘﾟ/, /ﾟДﾟ/, /ﾟдﾟ/, /o\^_\^o/, /c\^_\^o/, /\(ﾟΘﾟ\)/, /\['_'\]/];

                const patternMatches = aaencodePatterns.filter((pattern) => pattern.test(input)).length;

                const hasMinLength = input.length >= 100;
                const hasAASignature = input.includes("ﾟДﾟ") && input.includes("ﾟωﾟﾉ");

                let confidence = 0;
                if (hasAASignature) confidence += 40;
                if (patternMatches >= 3) confidence += 30;
                if (ratio > 0.3) confidence += Math.min(ratio * 50, 25);
                if (hasMinLength) confidence += 5;

                const isAAEncode = confidence >= 70 || (hasAASignature && patternMatches >= 2);

                return {
                    type: "AAEncode",
                    isDetected: isAAEncode,
                    confidence: Math.min(confidence, 100),
                    ratio: Math.round(ratio * 100),
                    patternMatches,
                    hasAASignature,
                    length: input.length,
                    features: aaencodePatterns.filter((pattern) => pattern.test(input)).map((p) => p.source),
                };
            }

            function detectEval(input) {
                const evalPatterns = [
                    /eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*d\s*\)\s*\{[\s\S]*?e\s*=\s*function\s*\(\s*c\s*\)\s*\{[\s\S]*?return\s*\(\s*c\s*<\s*a[\s\S]*?String\.fromCharCode[\s\S]*?toString\s*\(\s*36\s*\)[\s\S]*?return\s+p[\s\S]*?\}\s*\(['"`][^'"`]*['"`]\.split\s*\(\s*['"`]\|['"`]\s*\)\s*,[\s\S]*?\)\s*\)/gi,
                ];

                // 只检测指定的 Dean Edwards Packer 格式
                const isDetected = evalPatterns.some((pattern) => pattern.test(input));

                return {
                    type: "Eval",
                    isDetected: isDetected,
                    confidence: isDetected ? 100 : 0,
                    evalCount: isDetected ? 1 : 0,
                    nestedDepth: 0,
                    hasStringEncoding: false,
                    hasUnicodeEscape: false,
                    hasHexEncoding: false,
                    hasObfuscatedStrings: false,
                    hasPackedCode: isDetected,
                    hasEvalString: false,
                    hasBase64Like: false,
                    hasUnescape: false,
                    hasAtob: false,
                    hasCharCodeAt: false,
                    hasFromCharCode: false,
                    specialMatches: 0,
                    obfuscationCount: 0,
                    stringConcatCount: 0,
                    shortVarRatio: 0,
                    patterns: isDetected ? [1] : [0],
                    length: input.length,
                    density: 0,
                    forceDetect: false,
                };
            }

            function checkNestedEvalDepth(code) {
                return 0;
            }

            function comprehensiveDetection(inputDecoded || input) {
                // 🆕 第一优先级：检测jsjiami
                if (input.includes("jsjiami.com.v5") || input.includes("jsjiami.com.v6") || input.includes("jsjiami.com.v7")) {
                    return {
                        primaryType: "jsjiami",
                        primaryConfidence: 95,
                        primaryResult: {
                            type: "jsjiami",
                            confidence: 95,
                            method: "Unicode转义",
                            isDetected: true,
                        },
                        aaResult: { isDetected: false, confidence: 0 },
                        evalResult: { isDetected: false, confidence: 0 },
                        hasMultipleEncodings: false,
                    };
                }

                const aaResult = detectAAEncode(input);
                const evalResult = detectEval(input);

                let primaryType = "Unknown";
                let primaryConfidence = 0;
                let primaryResult = null;

                if (aaResult.isDetected && aaResult.confidence > evalResult.confidence) {
                    primaryType = "AAEncode";
                    primaryConfidence = aaResult.confidence;
                    primaryResult = aaResult;
                } else if (evalResult.isDetected) {
                    primaryType = "Eval";
                    primaryConfidence = evalResult.confidence;
                    primaryResult = evalResult;
                }

                return {
                    primaryType,
                    primaryConfidence,
                    primaryResult,
                    aaResult,
                    evalResult,
                    hasMultipleEncodings: aaResult.isDetected && evalResult.isDetected,
                };
            }

            function decodeAAEncode(code) {
                try {
                    addLog("🔤 使用专业AADecode插件解密...", "info");

                    const result = window.professionalAADecode(code);

                    if (result !== null && result !== undefined && result !== code) {
                        const resultStr = String(result);
                        addLog("✅ 专业AADecode解密成功！", "success");
                        return {
                            success: true,
                            method: "专业AADecode插件",
                            result: resultStr,
                            preservedHeader: result.includes("\n\n") && code.search(/ﾟωﾟﾉ|ﾟДﾟ/) > 0,
                        };
                    } else {
                        throw new Error("专业插件返回空结果或未改变");
                    }
                } catch (error) {
                    addLog("❌ 专业AADecode解密失败: " + error.message, "error");

                    try {
                        addLog("🔄 尝试通用AADecode插件...", "info");
                        if (window.DecodePlugins && window.DecodePlugins.aadecode) {
                            const backupResult = window.DecodePlugins.aadecode.plugin(code);
                            if (backupResult && backupResult !== code) {
                                addLog("✅ 通用AADecode解密成功！", "success");
                                return {
                                    success: true,
                                    method: "通用AADecode插件",
                                    result: String(backupResult),
                                    warning: "使用备用解密方案",
                                };
                            }
                        }
                    } catch (e2) {
                        addLog("❌ 备用插件也失败: " + e2.message, "error");
                    }

                    return {
                        success: false,
                        method: "解密失败",
                        result: null,
                        error: "AAEncode解密失败: " + error.message,
                    };
                }
            }

            function decodeEval(code) {
                try {
                    addLog("🔧 使用专业Eval解包插件解密...", "info");

                    const result = window.DecodePlugins.eval.plugin(code);

                    if (result !== null && result !== undefined && result !== code) {
                        const resultStr = String(result);
                        addLog("✅ 专业Eval解包成功！", "success");

                        const detection = comprehensiveDetection(resultStr);
                        if (detection.primaryType !== "Unknown" && detection.primaryConfidence > 60) {
                            addLog("🔄 检测到嵌套编码，开始递归解密...", "info");
                            const recursiveResult = performDecryption(resultStr);
                            if (recursiveResult.success) {
                                return {
                                    success: true,
                                    method: "Eval解包+递归解密",
                                    result: recursiveResult.result,
                                    recursive: true,
                                    steps: 2,
                                };
                            }
                        }

                        return {
                            success: true,
                            method: "专业Eval解包插件",
                            result: resultStr,
                            recursive: false,
                        };
                    } else {
                        throw new Error("Eval插件返回空结果或未改变");
                    }
                } catch (error) {
                    addLog("❌ 专业Eval解包失败: " + error.message, "error");

                    return {
                        success: false,
                        method: "解密失败",
                        result: null,
                        error: "Eval解包失败: " + error.message,
                    };
                }
            }

            function performDecryption(code) {
                const detection = comprehensiveDetection(code);

                if (detection.primaryType === "AAEncode") {
                    return decodeAAEncode(code);
                } else if (detection.primaryType === "Eval") {
                    return decodeEval(code);
                } else {
                    return tryOtherDecryptMethods(code);
                }
            }

            function updateDetectionPanel(detection) {
                const panel = document.getElementById("detectionPanel");
                const aaIndicator = document.getElementById("aaencodeIndicator");
                const evalIndicator = document.getElementById("evalIndicator");

                aaIndicator.classList.remove("show");
                evalIndicator.classList.remove("show");
                window.appData.isAAEncodeMode = false;
                window.appData.isEvalMode = false;

                if (detection.primaryType !== "Unknown") {
                    panel.style.display = "block";

                    // 🆕 拼接 variant
                    let typeText = detection.primaryType;
                    if (detection.primaryResult && detection.primaryResult.variant) {
                        typeText += ` (v${detection.primaryResult.variant})`;
                    }
                    document.getElementById("detectionType").textContent = typeText;

                    document.getElementById("detectionConfidence").textContent = detection.primaryConfidence + "%";

                    if (detection.primaryType === "AAEncode") {
                        aaIndicator.classList.add("show");
                        window.appData.isAAEncodeMode = true;
                        document.getElementById("detectionFeatures").textContent = detection.aaResult.patternMatches + "/9";
                        document.getElementById("detectionDetails").textContent = detection.aaResult.ratio + "%字符占比";
                    } else if (detection.primaryType === "Eval") {
                        evalIndicator.classList.add("show");
                        window.appData.isEvalMode = true;
                        document.getElementById("detectionFeatures").textContent = detection.evalResult.evalCount + "个eval";
                        document.getElementById("detectionDetails").textContent = "嵌套深度" + detection.evalResult.nestedDepth;
                    }

                    if (detection.hasMultipleEncodings) {
                        aaIndicator.classList.add("show");
                        evalIndicator.classList.add("show");
                        document.getElementById("detectionDetails").textContent = "多重编码";
                    }

                    const confidenceEl = document.getElementById("detectionConfidence");
                    if (detection.primaryConfidence >= 90) {
                        confidenceEl.style.color = "#10b981";
                    } else if (detection.primaryConfidence >= 70) {
                        confidenceEl.style.color = "#f59e0b";
                    } else {
                        confidenceEl.style.color = "#ef4444";
                    }

                    window.appData.lastDetection = detection;
                } else {
                    panel.style.display = "none";
                    window.appData.lastDetection = null;
                }
            }

            // 用户界面函数
            function testAAEncodeInput() {
                const input = document.getElementById("input").value.trim();
                if (!input) {
                    showToast("请先输入AAEncode密文");
                    return;
                }

                const detection = detectAAEncode(input);
                updateDetectionPanel({
                    primaryType: detection.isDetected ? "AAEncode" : "Unknown",
                    primaryConfidence: detection.confidence,
                    aaResult: detection,
                });

                if (detection.isDetected) {
                    showToast(`🎯 检测到AAEncode格式！置信度: ${detection.confidence}%`);
                    addLog(`AAEncode检测成功: 置信度 ${detection.confidence}%, 特征匹配 ${detection.patternMatches}/9`, "success");

                    setTimeout(() => {
                        const decodeResult = decodeAAEncode(input);
                        if (decodeResult.success) {
                            displayResult(decodeResult.result);
                            showToast("🎉 AAEncode解密成功！");
                            addLog(`解密完成，使用方法: ${decodeResult.method}`, "success");
                            if (decodeResult.preservedHeader) {
                                addLog("✨ 已保留脚本头部注释", "info");
                            }
                            if (decodeResult.warning) {
                                addLog(`⚠️ ${decodeResult.warning}`, "warning");
                            }
                        } else {
                            showToast("❌ AAEncode解密失败");
                            addLog(decodeResult.error, "error");
                        }
                    }, 500);
                } else {
                    showToast(`❌ 未检测到AAEncode格式 (置信度: ${detection.confidence}%)`);
                    addLog(`AAEncode检测失败: 置信度不足 ${detection.confidence}%`, "warning");
                }
            }

            function testEvalInput() {
                const input = document.getElementById("input").value.trim();
                if (!input) {
                    showToast("请先输入Eval包装的密文");
                    return;
                }

                // 🆕 优先检测jsjiami（安全版本）
                if (input.includes("jsjiami.com.v5") || input.includes("jsjiami.com.v6") || input.includes("jsjiami.com.v7")) {
                    showToast("❌ 检测到jsjiami混淆，此工具暂不支持jsjiami解密");
                    addLog("检测到jsjiami混淆代码，建议使用专门的jsjiami解密工具", "warning");

                    // 安全调用updateDetectionPanel（如果存在的话）
                    if (typeof updateDetectionPanel === "function") {
                        updateDetectionPanel({
                            primaryType: "jsjiami",
                            primaryConfidence: 95,
                            evalResult: { isDetected: true, confidence: 95 },
                        });
                    }
                    return;
                }

                const detection = detectEval(input);

                // 安全调用updateDetectionPanel
                if (typeof updateDetectionPanel === "function") {
                    updateDetectionPanel({
                        primaryType: detection.isDetected ? "Eval" : "Unknown",
                        primaryConfidence: detection.confidence,
                        evalResult: detection,
                    });
                }

                if (detection.isDetected) {
                    showToast(`🎯 检测到Eval包装！置信度: ${detection.confidence}%`);
                    addLog(`Eval检测成功: 置信度 ${detection.confidence}%, eval数量 ${detection.evalCount}, 嵌套深度 ${detection.nestedDepth}`, "success");

                    setTimeout(() => {
                        const decodeResult = decodeEval(input);
                        if (decodeResult.success) {
                            displayResult(decodeResult.result);
                            showToast("🎉 Eval解包成功！");
                            addLog(`解密完成，使用方法: ${decodeResult.method}`, "success");
                            if (decodeResult.recursive) {
                                addLog(`🔄 执行了${decodeResult.steps}步递归解密`, "info");
                            }
                            if (decodeResult.warning) {
                                addLog(`⚠️ ${decodeResult.warning}`, "warning");
                            }
                        } else {
                            showToast("❌ Eval解包失败");
                            addLog(decodeResult.error, "error");
                        }
                    }, 500);
                } else {
                    showToast(`❌ 未检测到Eval包装 (置信度: ${detection.confidence}%)`);
                    addLog(`Eval检测失败: 置信度不足 ${detection.confidence}%`, "warning");
                }
            }

            function autoDetectAndDecrypt() {
                const input = document.getElementById("input").value.trim();
                if (!input) {
                    showToast("请先输入需要解密的代码");
                    return;
                }

                addLog("🤖 开始智能检测...", "info");

                const detection = comprehensiveDetection(inputDecoded || input);
                updateDetectionPanel(detection);

                if (detection.primaryType !== "Unknown") {
                    addLog(`🎯 检测到${detection.primaryType}格式 (置信度: ${detection.primaryConfidence}%)`, "success");

                    const decodeResult = performDecryption(input);
                    if (decodeResult.success) {
                        displayResult(decodeResult.result);
                        showToast(`🎉 ${detection.primaryType}自动解密成功！`);
                        addLog(`自动解密完成: ${decodeResult.method}`, "success");
                        if (decodeResult.preservedHeader) {
                            addLog("✨ 头部注释已保留", "info");
                        }
                        if (decodeResult.recursive) {
                            addLog(`🔄 执行了递归解密`, "info");
                        }
                        return;
                    } else {
                        addLog(`${detection.primaryType}解密失败，尝试其他方法...`, "warning");
                    }
                }

                addLog("🔍 检测其他编码格式...", "info");

                tryOtherDecryptMethods(input).then((result) => {
                    if (result.success) {
                        displayResult(result.content);
                        showToast(`🎉 ${result.method}解密成功！`);
                        addLog(`自动解密完成: ${result.method}`, "success");
                    } else {
                        showToast("❌ 未能自动识别编码格式");
                        addLog("智能检测未找到支持的编码格式", "warning");
                    }
                });
            }

            function loadDemoCode() {
                const demoTypes = ["aaencode", "eval", "mixed"];
                const selectedType = demoTypes[Math.floor(Math.random() * demoTypes.length)];

                let demoCode = "";

                if (selectedType === "aaencode") {
                    demoCode = `// AAEncode演示代码
// 作者: 演示用户
// 时间: 2024-01-01
// 说明: 这段注释将被保留

ﾟωﾟﾉ= /｀ｍ'）ﾉ ~┻━┻   //*'∇｀*/ ['_']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); (ﾟДﾟ) =(ﾟΘﾟ)= (o^_^o)/ (o^_^o);(ﾟДﾟ)={ﾟΘﾟ: '_' ,ﾟωﾟﾉ : ((ﾟωﾟﾉ==3) +'_') [ﾟΘﾟ] ,ﾟｰﾟﾉ :(ﾟωﾟﾉ+ '_')[o^_^o -(ﾟΘﾟ)] ,ﾟДﾟﾉ:((ﾟｰﾟ==3) +'_')[ﾟｰﾟ] }; (ﾟДﾟ) [ﾟΘﾟ] =((ﾟωﾟﾉ==3) +'_') [c^_^o];(ﾟДﾟ) ['c'] = ((ﾟДﾟ)+'_') [ (ﾟｰﾟ)+(ﾟｰﾟ)-(ﾟΘﾟ) ];(ﾟДﾟ) ['o'] = ((ﾟДﾟ)+'_') [ﾟΘﾟ];(ﾟoﾟ)=(ﾟДﾟ) ['c']+(ﾟДﾟ) ['o']+(ﾟωﾟﾉ +'_')[ﾟΘﾟ]+ ((ﾟωﾟﾉ==3) +'_') [ﾟｰﾟ] + ((ﾟДﾟ) +'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ ((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+((ﾟｰﾟ==3) +'_') [(ﾟｰﾟ) - (ﾟΘﾟ)]+(ﾟДﾟ) ['c']+((ﾟДﾟ)+'_') [(ﾟｰﾟ)+(ﾟｰﾟ)]+ (ﾟДﾟ) ['o']+((ﾟｰﾟ==3) +'_') [ﾟΘﾟ];(ﾟДﾟ) ['_'] = (o^_^o) [ﾟoﾟ] [ﾟoﾟ];(ﾟεﾟ)=((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟДﾟ) .ﾟДﾟﾉ+((ﾟДﾟ)+'_') [(ﾟｰﾟ) + (ﾟｰﾟ)]+((ﾟｰﾟ==3) +'_') [o^_^o -ﾟΘﾟ]+((ﾟｰﾟ==3) +'_') [ﾟΘﾟ]+ (ﾟωﾟﾉ +'_') [ﾟΘﾟ]; (ﾟｰﾟ)+=(ﾟΘﾟ); (ﾟДﾟ)[ﾟεﾟ]='\\\\'; (ﾟДﾟ).ﾟΘﾟﾉ=(ﾟДﾟ+ ﾟｰﾟ)[o^_^o -(ﾟΘﾟ)];(oﾟｰﾟo)=(ﾟωﾟﾉ +'_')[c^_^o];(ﾟДﾟ) [ﾟoﾟ]='\"';(ﾟДﾟ) ['_'] ( (ﾟДﾟ) ['_'] (ﾟεﾟ+(ﾟДﾟ)[ﾟoﾟ]+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟΘﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((o^_^o) +(o^_^o))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((o^_^o) - (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟΘﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ ((ﾟｰﾟ) + (o^_^o))+ (ﾟДﾟ)[ﾟεﾟ]+((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ (c^_^o)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟΘﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟΘﾟ)+ (ﾟｰﾟ)+ (ﾟｰﾟ)+ (ﾟДﾟ)[ﾟεﾟ]+(ﾟｰﾟ)+ ((ﾟｰﾟ) + (ﾟΘﾟ))+ (ﾟДﾟ)[ﾟoﾟ]) (ﾟΘﾟ)) ('_');`;
                } else if (selectedType === "eval") {
                    demoCode = `// Eval包装演示代码
// 这是一个简单的eval包装示例

eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c])}}return p}('0("1 2!");',3,3,'console|Hello|World'.split('|'),0,{}))

// 更复杂的嵌套eval示例
eval("eval(\\"console.log('这是嵌套的eval');\\")");

// 带有字符串编码的eval
eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%22%48%65%6c%6c%6f%20%57%6f%72%6c%64%22%29%3b'));`;
                } else {
                    demoCode = `// 混合编码演示 - 既有AAEncode又有Eval
// 请注意：这只是演示，实际可能更复杂

// 第一层：Eval包装
eval(function(){
    // 第二层：可能是AAEncode
    var code = "ﾟωﾟﾉ= /｀ｍ'）ﾉ ~┻━┻   //*'∇｀*/";
    console.log("混合编码演示");
    return "alert('解密成功!');";
}());

// 另一个复杂示例
eval("var x = 'ﾟДﾟ'; console.log('检测到特殊字符');");`;
                }

                document.getElementById("input").value = demoCode;
                showToast(`📝 已加载${selectedType === "aaencode" ? "AAEncode" : selectedType === "eval" ? "Eval" : "混合编码"}演示代码`);
                addLog(`加载${selectedType}演示代码`, "info");

                setTimeout(() => {
                    const detection = comprehensiveDetection(demoCode);
                    updateDetectionPanel(detection);
                    if (detection.primaryType !== "Unknown") {
                        showToast(`🎯 自动检测: ${detection.primaryType}格式 (${detection.primaryConfidence}%置信度)`);
                    }
                }, 500);
            }

            function showRemoteUrlDialog() {
                const url = prompt("请输入远程文件URL地址:", "");
                if (url && url.trim()) {
                    // 自动添加协议（如果用户没有输入）
                    let finalUrl = url.trim();
                    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
                        finalUrl = "https://" + finalUrl;
                    }
                    loadRemoteFile(finalUrl);
                }
            }

            function loadRemoteFile(url) {
                addLog("开始加载远程文件: " + url, "info");

                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("网络响应错误: " + response.status);
                        }
                        return response.text();
                    })
                    .then((content) => {
                        document.getElementById("input").value = content;
                        // detectCode(); // 删除这行
                        addLog("远程文件加载成功", "success");
                        showToast("✅ 远程文件加载成功");
                    })
                    .catch((error) => {
                        addLog("远程文件加载失败: " + error.message, "error");
                        showToast("❌ 远程文件加载失败: " + error.message);
                    });
            }

            async function pasteFromClipboard() {
                try {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                        document.getElementById("input").value = text;
                        showToast("📋 剪贴板内容已粘贴");
                        addLog("从剪贴板粘贴内容", "success");

                        setTimeout(() => {
                            const detection = comprehensiveDetection(text);
                            updateDetectionPanel(detection);
                            if (detection.primaryType !== "Unknown") {
                                showToast(`🎯 检测到${detection.primaryType}！置信度: ${detection.primaryConfidence}%`);
                            }
                        }, 300);
                    } else {
                        showToast("❌ 剪贴板为空");
                    }
                } catch (error) {
                    addLog("剪贴板访问失败: " + error.message, "error");
                    showToast("❌ 无法访问剪贴板，请手动粘贴");
                }
            }

            // 智能清理输入 - 超简化版
            function cleanInput() {
                const inputEl = document.getElementById("input");
                const input = inputEl.value.trim();

                if (!input) {
                    showToast("请先输入代码");
                    return;
                }

                addLog("开始智能清理代码...", "info");

                // 统一的提取模式配置
                const patterns = [
                    {
                        name: "jsjiami格式(单引号)",
                        test: (input) => input.indexOf(";var encode_version") !== -1,
                        extract: (input) => {
                            const jsjiamiStart = input.indexOf(";var encode_version");
                            const fromStart = input.substring(jsjiamiStart);
                            const jsjiamiEnd = fromStart.indexOf(";encode_version = 'jsjiami.com.v5';");
                            if (jsjiamiEnd !== -1) {
                                return fromStart.substring(0, jsjiamiEnd + ";encode_version = 'jsjiami.com.v5';".length);
                            }
                            return null;
                        },
                    },
                    {
                        name: "jsjiami格式(双引号)",
                        test: (input) => input.indexOf(";var encode_version") !== -1,
                        extract: (input) => {
                            const jsjiamiStart = input.indexOf(";var encode_version");
                            const fromStart = input.substring(jsjiamiStart);
                            const jsjiamiEnd = fromStart.indexOf(';encode_version = "jsjiami.com.v5";');
                            if (jsjiamiEnd !== -1) {
                                return fromStart.substring(0, jsjiamiEnd + ';encode_version = "jsjiami.com.v5";'.length);
                            }
                            return null;
                        },
                    },
                ];

                // 尝试提取特定格式
                for (const pattern of patterns) {
                    if (pattern.test(input)) {
                        const extracted = pattern.extract(input);
                        if (extracted) {
                            inputEl.value = extracted;
                            showToast(`🎯 提取${pattern.name}完成`);
                            addLog(`提取: ${input.length} → ${extracted.length} 字符`, "success");
                            return;
                        }
                    }
                }

                // 基础清理
                let cleaned = input
                    .replace(/\/\/.*$/gm, "") // 单行注释
                    .replace(/\/\*[\s\S]*?\*\//g, "") // 多行注释
                    .replace(/<!--[\s\S]*?-->/g, "") // HTML注释
                    .replace(/^\s*console\.(log|warn|error)\s*\([^)]*\)\s*;?\s*$/gm, "") // console语句
                    .replace(/^\s*alert\s*\([^)]*\)\s*;?\s*$/gm, "") // alert语句
                    .replace(/^\s*[\r\n]+/gm, "") // 空行
                    .replace(/\s+/g, " ") // 多余空白
                    .trim();

                // 更新结果
                if (cleaned === input) {
                    showToast("🔍 未发现需要清理的内容");
                    addLog("代码已经是纯净格式", "info");
                } else {
                    inputEl.value = cleaned;
                    showToast("🧹 代码清理完成");
                    addLog(`清理: ${input.length} → ${cleaned.length} 字符`, "success");
                }
            }

            // 智能预处理混合密文
            function preprocessCiphertext(input) {
                addLog("执行智能预处理...", "info");

                let processed = input
                    .replace(/\/\/.*$/gm, "")
                    .replace(/\/\*[\s\S]*?\*\//g, "")
                    .replace(/<!--[\s\S]*?-->/g, "")
                    .replace(/^\s*\/\/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*$/gm, "")
                    .replace(/^\s*\/\/解密脚本.*$/gm, "")
                    .replace(/^\s*\/\/.*?(解密|脚本|说明|注释|原始|混淆|结果).*$/gm, "");

                const patterns = [
                    {
                        name: "jsjiami格式(单引号)",
                        pattern: /;var encode_version[\s\S]*?;encode_version = 'jsjiami\.com\.v\d+';/,
                        extract: (match) => match[0],
                    },
                    {
                        name: "jsjiami格式(双引号)",
                        pattern: /;var encode_version[\s\S]*?;encode_version = "jsjiami\.com\.v\d+";/,
                        extract: (match) => match[0],
                    },
                    {
                        name: "eval包装的jsjiami",
                        pattern: /eval\s*\(\s*(['"`])(.*?jsjiami\.com\.v\d+.*?)\1\s*\)/s,
                        extract: (match) => match[2],
                    },
                    {
                        name: "AAEncode混淆",
                        pattern: /(ﾟωﾟﾉ.*?ﾟΘﾟ.*?)/s,
                        extract: (match) => match[1],
                    },
                    {
                        name: "eval包装",
                        pattern: /eval\s*\(\s*(['"`])((?:\\u[0-9a-fA-F]{4}|[^"'`\\]|\\.){20,})\1\s*\)/s,
                        extract: (match) => match[2],
                    },
                    {
                        name: "Function构造器",
                        pattern: /(?:new\s+)?Function\s*\(\s*(['"`])((?:\\u[0-9a-fA-F]{4}|[^"'`\\]|\\.){20,})\1\s*\)/s,
                        extract: (match) => match[2],
                    },
                ];

                for (const pattern of patterns) {
                    const matches = processed.match(pattern.pattern);
                    if (matches) {
                        const extracted = pattern.extract(matches);
                        if (extracted && extracted.length > 50) {
                            addLog(`智能提取${pattern.name}格式密文`, "success");
                            return extracted;
                        }
                    }
                }

                return processed
                    .replace(/^\s*\/\/\s*(原始|原文|明文).*$/gm, "")
                    .replace(/^\s*console\.log\s*\(.*?\)\s*;?\s*$/gm, "")
                    .replace(/^\s*alert\s*\(.*?\)\s*;?\s*$/gm, "")
                    .replace(/^\s*[\r\n]/gm, "")
                    .replace(/^\s+/gm, "")
                    .replace(/\s+/g, " ")
                    .trim();
            }

            // 检查是否为混合内容
            function checkIfMixedContent(input) {
                const mixedContentIndicators = [
                    /\/\/.*$/m,
                    /\/\*[\s\S]*?\*\//,
                    /<!--[\s\S]*?-->/,
                    /[\u4e00-\u9fff]/,
                    /(原始代码|原文|明文|解密结果|解密完成)/,
                    /<[^>]+>/,
                    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
                    /(console\.log|alert|document\.write)\s*\(/,
                    /eval\s*\(.*?\).*eval\s*\(/s,
                    /(解密脚本|混淆工具|加密工具)/,
                ];

                for (const indicator of mixedContentIndicators) {
                    if (indicator.test(input)) {
                        return true;
                    }
                }

                const lines = input.split("\n");
                if (lines.length > 10) {
                    const nonCipherLines = lines.filter((line) => {
                        const trimmedLine = line.trim();
                        return trimmedLine.length > 0 && !/^[A-Za-z0-9+/=\\u]+$/.test(trimmedLine) && !/^[0-9a-fA-F\s]+$/.test(trimmedLine) && !/^[\x20-\x7E]*$/.test(trimmedLine);
                    });

                    if (nonCipherLines.length > lines.length * 0.3) {
                        return true;
                    }
                }

                return false;
            }

            // 验证输入质量
            function validateInput() {
                const input = document.getElementById("input").value.trim();
                if (!input) {
                    showToast("请先输入代码");
                    return;
                }

                addLog("🔍 开始质量检查...", "info");

                const issues = [];
                const warnings = [];
                const suggestions = [];

                // 基础检查
                if (input.length < 50) {
                    issues.push("代码长度过短(<50字符)");
                    suggestions.push("确保复制了完整的代码内容");
                }

                if (input.length > 500000) {
                    warnings.push("代码长度过长(>500KB)");
                    suggestions.push("考虑分段处理大文件");
                }

                // 检测代码类型
                const detection = comprehensiveDetection(inputDecoded || input);

                if (detection.primaryType !== "Unknown") {
                    // 已识别的密文格式
                    addLog(`🎯 检测到格式: ${detection.primaryType} (置信度: ${detection.primaryConfidence}%)`, "info");

                    if (detection.primaryConfidence < 70) {
                        warnings.push(`${detection.primaryType}置信度较低 (${detection.primaryConfidence}%)`);
                        suggestions.push("可能需要清理或格式不完整");
                    }

                    // 特定格式的详细检查
                    if (detection.primaryType === "AAEncode" && detection.aaResult.patternMatches < 3) {
                        warnings.push("AAEncode特征模式不足");
                        suggestions.push("检查是否为完整的AAEncode代码");
                    }

                    if (detection.primaryType === "Eval" && detection.evalResult.evalCount < 2) {
                        warnings.push("Eval调用次数较少");
                        suggestions.push("可能不是标准的Eval混淆");
                    }

                    if (detection.primaryType === "jsjiami") {
                        if (!input.includes("jsjiami.com.v")) {
                            warnings.push("jsjiami标识不完整");
                            suggestions.push("确保包含完整的jsjiami标识");
                        }
                    }

                    // 检查多重编码
                    if (detection.hasMultipleEncodings) {
                        warnings.push("检测到多重编码");
                        suggestions.push("可能需要多次解密");
                    }
                } else {
                    // 未识别格式的清洁度检查
                    addLog("🔍 未识别的格式，进行清洁度检查", "info");

                    if (/[\u4e00-\u9fff]/.test(input)) {
                        issues.push("包含中文字符");
                        suggestions.push("使用智能清理功能移除注释");
                    }

                    if (/\/\/|\/\*|\*\/|<!--/.test(input)) {
                        issues.push("包含注释符号");
                        suggestions.push("使用智能清理功能移除注释");
                    }

                    if (/<[^>]+>/.test(input)) {
                        issues.push("包含HTML标签");
                        suggestions.push("提取script标签内的代码内容");
                    }

                    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(input)) {
                        issues.push("包含时间戳");
                        suggestions.push("移除解密脚本的时间信息");
                    }

                    if (input.includes("原始代码") || input.includes("原文") || input.includes("明文")) {
                        issues.push("包含原文标识");
                        suggestions.push("移除原始代码说明部分");
                    }

                    if (input.includes("解密完成") || input.includes("解密结果")) {
                        issues.push("包含解密结果标识");
                        suggestions.push("只保留密文部分");
                    }

                    if (/console\.log|alert|document\.write/.test(input)) {
                        warnings.push("包含调试代码");
                        suggestions.push("移除调试输出语句");
                    }
                }

                // 计算质量评分
                let score = 100;
                score -= issues.length * 25;
                score -= warnings.length * 10;
                score = Math.max(0, score);

                // 显示结果
                addLog(`📊 质量评分: ${score}/100`, score >= 80 ? "success" : score >= 60 ? "warning" : "error");

                if (issues.length > 0) {
                    addLog(`❌ 发现问题: ${issues.join(", ")}`, "error");
                }

                if (warnings.length > 0) {
                    addLog(`⚠️ 警告: ${warnings.join(", ")}`, "warning");
                }

                if (suggestions.length > 0) {
                    addLog(`💡 建议: ${suggestions.join("; ")}`, "info");
                }

                // 总结和建议
                if (score >= 90) {
                    showToast("✅ 代码质量优秀！");
                    addLog("代码质量检查通过，可以直接解密", "success");
                } else if (score >= 70) {
                    showToast("👍 代码质量良好");
                    addLog("代码质量良好，建议直接解密", "success");
                } else if (score >= 50) {
                    showToast("⚠️ 代码质量一般");
                    addLog("建议使用智能清理功能后再解密", "warning");
                } else {
                    showToast("❌ 代码质量较差");
                    addLog("强烈建议先进行智能清理", "error");
                }
            }

            // 清空输入
            function clearInput() {
                document.getElementById("input").value = "";
                const remoteUrlElement = document.getElementById("remoteUrl");
                if (remoteUrlElement) {
                    remoteUrlElement.value = "";
                }
                showToast("代码输入已清空");
                addLog("清空代码输入内容", "info");
            }

            async function startDecrypt() {
                const input = document.getElementById("input").value.trim();

                if (!input) {
                    showToast("请先输入需要解密的代码");
                    return;
                }

                try {
                    addLog("🚀 开始解密流程...", "info");
                    displayResult("");
                    setProgress(0);

                    const detection = comprehensiveDetection(inputDecoded || input);
                    updateDetectionPanel(detection);

                    if (detection.primaryType !== "Unknown") {
                        addLog(`🎯 检测到${detection.primaryType} (置信度: ${detection.primaryConfidence}%)`, "info");

                        setProgress(30);
                        const decodeResult = performDecryption(input);
                        setProgress(80);

                        if (decodeResult.success) {
                            displayResult(decodeResult.result);
                            showToast(`🎉 ${detection.primaryType}解密成功！`);
                            addLog(`解密完成: ${decodeResult.method}`, "success");

                            if (decodeResult.preservedHeader) {
                                addLog("✨ 头部注释已保留", "info");
                            }
                            if (decodeResult.recursive) {
                                addLog(`🔄 执行了${decodeResult.steps || "多"}步递归解密`, "info");
                            }
                            if (decodeResult.warning) {
                                addLog(`⚠️ ${decodeResult.warning}`, "warning");
                            }

                            setProgress(100);

                            document.getElementById("output").scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            });
                            return;
                        } else {
                            addLog(`${detection.primaryType}解密失败，尝试其他方法`, "warning");
                        }
                    }

                    addLog("🔍 尝试其他解密方法...", "info");
                    setProgress(50);

                    const result = await tryOtherDecryptMethods(input);
                    if (result.success) {
                        displayResult(result.content);
                        showToast(`🎉 ${result.method}解密成功！`);
                        addLog(`解密完成: ${result.method}`, "success");
                        setProgress(100);
                    } else {
                        if (window.appData.token && window.appData.repo) {
                            addLog("🌐 使用GitHub Actions解密...", "info");
                            await submitToGitHub(input);
                            await waitForResult();
                        } else {
                            showToast("❌ 解密失败，请检查输入格式");
                            addLog("所有解密方法都失败了", "error");
                            setProgress(0);
                        }
                    }
                } catch (error) {
                    addLog("解密失败: " + error.message, "error");
                    showToast("解密失败: " + error.message);
                    setProgress(0);
                }
            }

            async function tryOtherDecryptMethods(input) {
                // Base64解密
                if (/^[A-Za-z0-9+/]+=*$/.test(input.replace(/\s/g, ""))) {
                    try {
                        const decoded = atob(input.replace(/\s/g, ""));
                        if (decoded.length > 10) {
                            return { success: true, method: "Base64", content: decoded };
                        }
                    } catch (e) {
                        // 继续尝试其他方法
                    }
                }

                // URL解码
                if (/%[0-9a-fA-F]{2}/.test(input)) {
                    try {
                        const decoded = decodeURIComponent(input);
                        if (decoded !== input) {
                            return { success: true, method: "URL解码", content: decoded };
                        }
                    } catch (e) {
                        // 继续尝试其他方法
                    }
                }

                // 十六进制解密
                if (/^[0-9a-fA-F\s]+$/.test(input) && input.length > 20) {
                    try {
                        const hex = input.replace(/\s/g, "");
                        const decoded = hex.replace(/../g, (h) => String.fromCharCode(parseInt(h, 16)));
                        if (decoded.length > 10) {
                            return { success: true, method: "十六进制", content: decoded };
                        }
                    } catch (e) {
                        // 继续尝试其他方法
                    }
                }

                return { success: false, method: null, content: null };
            }

            function displayResult(content) {
                const output = document.getElementById("output");

                if (!content || content.includes("解密结果将显示在这里")) {
                    output.innerHTML = '<span style="color: #6b7280;">// 解密结果将显示在这里...</span>';
                    return;
                }

                content = content.replace(/<[^>]*>/g, "");

                if (content.includes("function") || content.includes("var ") || content.includes("let ") || content.includes("const ") || content.includes("{") || content.includes("}")) {
                    output.innerHTML = highlightJS(content);
                } else {
                    output.textContent = content;
                }
            }

            function highlightJS(code) {
                return code
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;")
                    .replace(
                        /\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|typeof|instanceof|in|of|class|extends|import|export|default|async|await|yield|true|false|null|undefined)\b/g,
                        '<span class="hljs-keyword">$1</span>'
                    )
                    .replace(/(&#39;|&quot;)(.*?)\1/g, '<span class="hljs-string">$1$2$1</span>')
                    .replace(/\b(\d+\.?\d*)\b/g, '<span class="hljs-number">$1</span>')
                    .replace(/\/\/.*$/gm, '<span class="hljs-comment">$&</span>')
                    .replace(/\/\*[\s\S]*?\*\//g, '<span class="hljs-comment">$&</span>')
                    .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="hljs-function">$1</span>')
                    .replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="hljs-property">$1</span>');
            }

            function setProgress(percent) {
                document.getElementById("progress").style.width = percent + "%";
            }

            async function submitToGitHub(code) {
                if (!window.appData.token || !window.appData.repo) {
                    throw new Error("GitHub配置不完整");
                }

                addLog("📤 提交代码到GitHub...", "info");

                const url = `https://api.github.com/repos/${window.appData.repo}/contents/input.js`;

                let sha = null;
                try {
                    const checkResp = await fetch(url, {
                        headers: {
                            Authorization: `token ${window.appData.token}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    });

                    if (checkResp.ok) {
                        const data = await checkResp.json();
                        sha = data.sha;
                    }
                } catch (e) {
                    // 文件不存在，创建新文件
                }

                const payload = {
                    message: `Update input.js - ${new Date().toISOString()}`,
                    content: btoa(unescape(encodeURIComponent(code))),
                    branch: "main",
                };

                if (sha) payload.sha = sha;

                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        Authorization: `token ${window.appData.token}`,
                        Accept: "application/vnd.github.v3+json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(`GitHub API错误: ${error.message}`);
                }

                addLog("✅ 代码已提交，等待Actions处理...", "success");
            }

            async function waitForResult() {
                const startTime = Date.now();
                const timeout = 60000;

                return new Promise((resolve) => {
                    const checkLoop = async () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min((elapsed / timeout) * 100, 100);
                        setProgress(progress);

                        if (elapsed >= timeout) {
                            addLog("⏰ 等待超时，尝试获取结果...", "warning");
                            const success = await getResult();
                            if (!success) {
                                showToast('⏰ GitHub Actions处理中，请稍后点击"获取结果"');
                            }
                            resolve();
                            return;
                        }

                        setTimeout(checkLoop, 3000);
                    };

                    checkLoop();
                });
            }

            async function getResult() {
                addLog("📥 获取解密结果...", "info");

                if (!window.appData.token || !window.appData.repo) {
                    showToast("请先配置GitHub Token和仓库地址");
                    return false;
                }

                const timestamp = Date.now();

                try {
                    const apiUrl = `https://api.github.com/repos/${window.appData.repo}/contents/output.js`;
                    const response = await fetch(`${apiUrl}?ref=main&_=${timestamp}`, {
                        headers: {
                            Authorization: `token ${window.appData.token}`,
                            Accept: "application/vnd.github.v3+json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const content = decodeBase64(data.content);

                        if (content && content.trim().length > 10) {
                            displayResult(content);
                            addLog("✅ GitHub API获取成功！", "success");
                            showToast("🎉 解密成功！");
                            setProgress(0);

                            document.getElementById("output").scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            });
                            return true;
                        }
                    } else if (response.status === 404) {
                        addLog("❌ output.js文件不存在", "warning");
                    }
                } catch (error) {
                    addLog("GitHub API失败: " + error.message, "warning");
                }

                try {
                    const rawUrl = `https://raw.githubusercontent.com/${window.appData.repo}/main/output.js?_=${timestamp}`;
                    const response = await fetch(rawUrl);

                    if (response.ok) {
                        const content = await response.text();
                        if (content && content.trim().length > 10) {
                            displayResult(content);
                            addLog("✅ Raw URL获取成功！", "success");
                            showToast("🎉 解密成功！");
                            setProgress(0);
                            return true;
                        }
                    }
                } catch (error) {
                    addLog("Raw URL失败: " + error.message, "warning");
                }

                addLog("❌ 获取失败，请稍后重试", "error");
                showToast("❌ 获取失败，请稍后重试");
                return false;
            }

            function decodeBase64(base64) {
                try {
                    const binaryString = atob(base64.replace(/\n/g, ""));
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    return new TextDecoder("utf-8").decode(bytes);
                } catch (e) {
                    return atob(base64.replace(/\n/g, ""));
                }
            }

            function beautifyJavaScript(code) {
                // 移除多余的空格和换行
                let beautified = code.replace(/\s+/g, " ").trim();

                // 在分号、大括号后添加换行
                beautified = beautified.replace(/;/g, ";\n");
                beautified = beautified.replace(/\{/g, "{\n");
                beautified = beautified.replace(/\}/g, "\n}\n");
                beautified = beautified.replace(/,\s*(?=[a-zA-Z_$\[])/g, ",\n");

                // 修复常见的格式问题
                beautified = beautified.replace(/\n\s*\n/g, "\n"); // 移除空行
                beautified = beautified.replace(/;\s*\n\s*\}/g, ";\n}"); // 修复分号后的括号

                const lines = beautified.split("\n");
                const result = [];
                let indentLevel = 0;
                const indent = "  "; // 2个空格缩进

                for (let line of lines) {
                    line = line.trim();
                    if (!line) continue;

                    // 检查是否需要减少缩进
                    if (line.includes("}") && !line.includes("{")) {
                        indentLevel = Math.max(0, indentLevel - 1);
                    }

                    // 添加缩进
                    let indentedLine = indent.repeat(indentLevel) + line;

                    // 特殊处理对象属性
                    if (line.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/)) {
                        // 这是对象属性，保持额外缩进
                        if (indentLevel > 0) {
                            indentedLine = indent.repeat(indentLevel) + line;
                        }
                    }

                    result.push(indentedLine);

                    // 检查是否需要增加缩进
                    if (line.includes("{") && !line.includes("}")) {
                        indentLevel++;
                    } else if (line.includes("=") && line.includes("{") && !line.includes("}")) {
                        indentLevel++;
                    }
                }

                // 最终格式化处理
                let formatted = result.join("\n");

                // 添加注释头部
                const timestamp = new Date().toLocaleString();
                const header = `//解密时间: ${timestamp}\n//解密工具: 科技解码器 v7.0\n//解密插件: eval\n\n`;

                // 特殊格式化处理
                formatted = formatted
                    .replace(/(\w+)\s*=\s*\{/g, "$1 = {") // 标准化对象赋值
                    .replace(/\{\s*\n\s*\}/g, "{}") // 空对象单行
                    .replace(/\[\s*\n\s*\]/g, "[]") // 空数组单行
                    .replace(/,\s*\]/g, ",\n]") // 数组结尾格式化
                    .replace(/\{\s*([^}]{1,50})\s*\}/g, "{ $1 }") // 短对象单行
                    .replace(/\n{3,}/g, "\n\n"); // 限制连续空行

                return header + formatted;
            }

            function beautifyCode() {
                const output = document.getElementById("output");
                let content = output.innerHTML.includes("<span") ? stripHTMLTags(output.innerHTML) : output.textContent;

                if (!content || content.includes("解密结果将显示在这里")) {
                    showToast("请先获取解密结果");
                    return;
                }

                try {
                    const beautified = beautifyJavaScript(content);
                    displayResult(beautified);
                    showToast("🎨 代码美化完成");
                    addLog("代码美化成功", "success");

                    // 滚动到结果区域
                    document.getElementById("output").scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                } catch (error) {
                    showToast("❌ 代码美化失败: " + error.message);
                    addLog("代码美化失败: " + error.message, "error");
                }
            }

            
// === HTML entity auto-decoder (safe, no behavior change for normal text) ===
function decodeHtmlEntities(s){
  try{
    if(!s || typeof s !== "string") return s||"";
    if(!/[&][a-zA-Z#0-9]+;/.test(s)) return s;
    const ta = document.createElement("textarea");
    ta.innerHTML = s;
    return ta.value;
  }catch(e){ return s; }
}
function stripHTMLTags(html) {
                const div = document.createElement("div");
                div.innerHTML = html;
                return div.textContent || div.innerText || "";
            }

            function copyResult() {
                const output = document.getElementById("output");
                let content;

                if (output.innerHTML.includes("<span")) {
                    content = stripHTMLTags(output.innerHTML);
                } else {
                    content = output.textContent || output.innerText;
                }

                if (!content || content.includes("解密结果将显示在这里")) {
                    showToast("❌ 没有可复制的内容");
                    return;
                }

                if (navigator.clipboard) {
                    navigator.clipboard
                        .writeText(content)
                        .then(() => {
                            showToast("📋 结果已复制到剪贴板");
                            addLog("复制成功", "success");
                        })
                        .catch(() => {
                            fallbackCopy(content);
                        });
                } else {
                    fallbackCopy(content);
                }
            }

            function fallbackCopy(content) {
                const textarea = document.createElement("textarea");
                textarea.value = content;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                showToast("📋 结果已复制到剪贴板");
                addLog("复制成功（备用方案）", "success");
            }

            function downloadResult() {
                const output = document.getElementById("output");
                let content;

                if (output.innerHTML.includes("<span")) {
                    content = stripHTMLTags(output.innerHTML);
                } else {
                    content = output.textContent || output.innerText;
                }

                if (!content || content.includes("解密结果将显示在这里")) {
                    showToast("❌ 没有可下载的内容");
                    return;
                }

                try {
                    const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "");

                    let filename = `decrypted_${timestamp}.js`;
                    if (window.appData.isAAEncodeMode && window.appData.isEvalMode) {
                        filename = `decrypted_mixed_${timestamp}.js`;
                    } else if (window.appData.isAAEncodeMode) {
                        filename = `decrypted_aaencode_${timestamp}.js`;
                    } else if (window.appData.isEvalMode) {
                        filename = `decrypted_eval_${timestamp}.js`;
                    }

                    a.href = url;
                    a.download = filename;
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    showToast("💾 文件下载已开始");
                    addLog("下载成功", "success");
                } catch (error) {
                    addLog("下载失败: " + error.message, "error");
                    showToast("❌ 下载失败");
                }
            }

            function validateResult() {
                const output = document.getElementById("output");
                let content = output.innerHTML.includes("<span") ? stripHTMLTags(output.innerHTML) : output.textContent;

                if (!content || content.includes("解密结果将显示在这里")) {
                    showToast("请先获取解密结果");
                    return;
                }

                try {
                    new Function(content);
                    showToast("✅ JavaScript语法检查通过");
                    addLog("代码语法验证成功", "success");
                } catch (error) {
                    showToast("⚠️ JavaScript语法检查失败: " + error.message);
                    addLog("代码语法验证失败: " + error.message, "warning");
                }
            }

            function clearAll() {
                document.getElementById("input").value = "";
                displayResult("");
                setProgress(0);
                updateDetectionPanel({ primaryType: "Unknown" });

                showToast("🗑 已清除所有内容");
                addLog("清除所有内容", "info");

                window.scrollTo({ top: 0, behavior: "smooth" });
            }

            function handleFileSelect(event) {
                const file = event.target.files[0];
                if (file) {
                    readFile(file);
                }
            }

            function handleDragOver(event) {
                event.preventDefault();
                event.currentTarget.classList.add("dragover");
            }

            function handleDragLeave(event) {
                event.currentTarget.classList.remove("dragover");
            }

            function handleDrop(event) {
                event.preventDefault();
                event.currentTarget.classList.remove("dragover");

                const files = event.dataTransfer.files;
                if (files.length > 0) {
                    readFile(files[0]);
                }
            }

            function readFile(file) {
                addLog(`📁 开始读取文件: ${file.name}`, "info");

                const reader = new FileReader();
                reader.onload = function (e) {
                    try {
                        let content = e.target.result;

                        document.getElementById("input").value = content;
                        showToast(`📁 文件加载成功: ${file.name}`);
                        addLog(`文件加载成功 (${content.length} 字符)`, "success");

                        setTimeout(() => {
                            const detection = comprehensiveDetection(content);
                            updateDetectionPanel(detection);
                            if (detection.primaryType !== "Unknown") {
                                showToast(`🎯 检测到${detection.primaryType}文件！置信度: ${detection.primaryConfidence}%`);
                            }
                        }, 500);
                    } catch (error) {
                        addLog(`文件处理失败: ${error.message}`, "error");
                        showToast("❌ 文件处理失败");
                    }
                };

                reader.onerror = function () {
                    addLog(`文件读取失败: ${file.name}`, "error");
                    showToast("❌ 文件读取失败");
                };

                reader.readAsText(file, "UTF-8");
            }

            function addLog(message, type = "info") {
                const logs = document.getElementById("logs");
                const time = new Date().toLocaleTimeString();
                const div = document.createElement("div");
                div.className = "log-" + type;
                div.textContent = `${time} ${message}`;
                logs.appendChild(div);
                logs.scrollTop = logs.scrollHeight;

                if (logs.children.length > 50) {
                    logs.removeChild(logs.firstChild);
                }
            }

            function showToast(message, duration = 3000) {
                const toast = document.getElementById("toast");
                toast.textContent = message;
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), duration);
            }

            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("token").value = window.appData.token;
                document.getElementById("repo").value = window.appData.repo;

                document.getElementById("token").addEventListener("input", function (e) {
                    window.appData.token = e.target.value;
                    localStorage.setItem("github_token", e.target.value);
                });

                document.getElementById("repo").addEventListener("input", function (e) {
                    window.appData.repo = e.target.value;
                    localStorage.setItem("repo_name", e.target.value);
                });

                document.getElementById("fileInput").addEventListener("change", handleFileSelect);

                const fileUpload = document.querySelector(".file-upload");
                fileUpload.addEventListener("dragover", handleDragOver);
                fileUpload.addEventListener("dragleave", handleDragLeave);
                fileUpload.addEventListener("drop", handleDrop);

                document.getElementById("input").addEventListener("input", function () {
                    const input = this.value.trim();
                    if (input.length > 50) {
                        const detection = comprehensiveDetection(inputDecoded || input);
                        updateDetectionPanel(detection);
                    } else {
                        updateDetectionPanel({ primaryType: "Unknown" });
                    }
                });

                document.addEventListener("keydown", function (e) {
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                        e.preventDefault();
                        startDecrypt();
                    } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                        e.preventDefault();
                        downloadResult();
                    } else if ((e.ctrlKey || e.metaKey) && e.key === "c" && !e.target.matches("input, textarea")) {
                        e.preventDefault();
                        copyResult();
                    } else if (e.key === "Escape") {
                        e.preventDefault();
                        clearAll();
                    }
                });

                addLog(`🚀 系统初始化完成 v${APP_CONFIG.VERSION}`, "success");
                addLog("🎯 专业AADecode插件已加载，支持头部注释保留", "info");
                addLog("🔧 专业Eval解包插件已加载，支持递归解密", "info");
                addLog("💡 快捷键: Ctrl+Enter解密, Ctrl+S下载, Ctrl+C复制, Esc清除", "info");
            });

            window.addEventListener("error", function (e) {
                addLog("❌ 发生错误: " + e.message, "error");
                console.error("Global error:", e);
            });

            window.addEventListener("unhandledrejection", function (e) {
                addLog("❌ Promise错误: " + e.reason, "error");
                console.error("Unhandled promise rejection:", e);
            });

            /* ===== minimal real detector (drop-in) ===== */
            (function () {
                // ------ 工具函数 ------
                const has = (s, r) => (typeof r === "string" ? s.includes(r) : r.test(s));
                const m = (s, r) => {
                    const x = s.match(r);
                    return x ? x[1] || x[0] : null;
                };

                // jsjiami: 典型的 encode_version 标记与末尾回写
                function detectJsjiami(s) {
                    const mark = /jsjiami\.com\.v(5|6|7)/i;
                    const head = /\b(?:var\s+)?encode_version\s*=/i;
                    const tail = /encode_version\s*=\s*['"]jsjiami\.com\.v\d+['"]\s*;?/i;
                    const hit = mark.test(s) || (head.test(s) && tail.test(s));
                    if (!hit) return { isDetected: false, confidence: 0 };
                    const variant = (m(s, mark) || "").replace(/[^567]/g, "") || m(s, /v(\d)/i) || "x";
                    let c = 70;
                    if (mark.test(s)) c += 15;
                    if (head.test(s) && tail.test(s)) c += 10;
                    if (s.length > 2000) c += 3;
                    return { isDetected: true, confidence: Math.min(c, 98), variant, detail: "encode_version + jsjiami.com" };
                }

                // sojson: 旧版注释/字样 & v7 常见构造
                function detectSojson(s) {
                    // 常见提示/注释 & 版本字样
                    const mark = /(sojson\.v(5|6|7)|sojson版本|sojson提示|sojson是|sojson.*加密)/i;
                    // v7 常见结构：立即执行包装 + 防调试 + toString(36) 等
                    const v7sig = /(?:function\s*\(\)\s*\{\s*['"]use strict['"]\s*;)?\s*!function\([\w$,]{1,6}\)\{[\s\S]{300,}?toString\(\s*36\s*\)/;
                    // sojson 常配的反调试片段
                    const anti = /debugger;|console\.\w+\(|_0x\w{4,}\(\w+\)/;

                    if (!(mark.test(s) || v7sig.test(s))) return { isDetected: false, confidence: 0 };

                    const v = m(s, /sojson\.v(5|6|7)/i) || (v7sig.test(s) ? "7" : null) || "x";
                    let c = 65;
                    if (mark.test(s)) c += 15;
                    if (v7sig.test(s)) c += 10;
                    if (anti.test(s)) c += 5;
                    return { isDetected: true, confidence: Math.min(c, 95), variant: v, detail: "sojson signatures" };
                }

                // AAEncode: ﾟωﾟ/ﾟДﾟ/ﾟΘﾟ 等字符族
                function detectAAEncode(s) {
                    const core = /(?:ﾟωﾟﾉ|ﾟДﾟ|ﾟдﾟ|ﾟΘﾟ)/;
                    if (!core.test(s)) return { isDetected: false, confidence: 0 };
                    const feats = (s.match(/[ﾟωДдΘﾉ\(\)\^_oc]/g) || []).length;
                    const ratio = feats / Math.max(1, s.length);
                    const c = Math.min(60 + Math.min(30, Math.floor(ratio * 100)), 95);
                    return { isDetected: true, confidence: c, features: feats, ratio: Math.round(ratio * 100) + "%", detail: "AAEncode glyphs" };
                }

                // Dean Edwards Packer（eval(function(p,a,c,k,e,d){...})）
                function detectPacker(s) {
                    const r = /eval\s*\(\s*function\s*\(\s*p\s*,\s*a\s*,\s*c\s*,\s*k\s*,\s*e\s*,\s*d\s*\)\s*\{/;
                    if (!r.test(s)) return { isDetected: false, confidence: 0 };
                    let c = 85;
                    if (/String\.fromCharCode|toString\(\s*36\s*\)/.test(s)) c += 5;
                    return { isDetected: true, confidence: Math.min(c, 95), detail: "packer pattern" };
                }

                // JSFuck: 仅由 []()+! 组成的大段代码
                function detectJSFuck(s) {
                    const body = s.replace(/\s+/g, "");
                    if (!body) return { isDetected: false, confidence: 0 };
                    const jsfuck = /^[\[\]\(\)\!\+<>={}]*$/.test(body) && body.length > 80;
                    return jsfuck ? { isDetected: true, confidence: 92, detail: "[]()+! only" } : { isDetected: false, confidence: 0 };
                }

                // JJEncode: 以 _$ / $___ 等符号变量为核心，形如 $$+_+$ 组合
                function detectJJEncode(s) {
                    const sym = /(^|\b)var\s+[_$]{2,}[A-Za-z0-9_$]*\s*=\s*.*?;/;
                    const patt = /\$\$|\+_|\$_|\$__|___\$|_\$\$|__\$/;
                    if (!(sym.test(s) || patt.test(s))) return { isDetected: false, confidence: 0 };
                    let c = 70;
                    if (sym.test(s)) c += 10;
                    if ((s.match(patt) || []).length > 8) c += 10;
                    return { isDetected: true, confidence: Math.min(c, 92), detail: "JJ symbols" };
                }

                // JS-Obfuscator（常见 _0x 开头数组 + toString(16) 访问器）
                function detectObfuscator(s) {
                    const arr = /var\s+_0x[a-f0-9]{4,}\s*=\s*\[/i;
                    const acc = /\[_0x[a-f0-9]{4,}\([a-z0-9_]+\)\]/i;
                    if (!(arr.test(s) || acc.test(s))) return { isDetected: false, confidence: 0 };
                    let c = 70;
                    if (arr.test(s)) c += 10;
                    if (acc.test(s)) c += 10;
                    if (/function\s*\(_0x[a-f0-9]{4,}\)\s*\{/.test(s)) c += 2;
                    return { isDetected: true, confidence: Math.min(c, 93), detail: "_0x*** string array" };
                }

                // ------ 主函数：综合判定 ------
                function comprehensiveDetectionPatched(input) {
                    const s = (input || "").trim();
                    if (!s) return { primaryType: "Unknown", primaryConfidence: 0 };

                    // 明确优先级：jsjiami > sojson > 其它
                    const jj = detectJsjiami(s);
                    if (jj.isDetected) {
                        return {
                            primaryType: "jsjiami",
                            primaryConfidence: jj.confidence,
                            primaryResult: jj,
                            aaResult: { isDetected: false, confidence: 0 },
                            evalResult: { isDetected: false, confidence: 0 },
                            hasMultipleEncodings: false,
                        };
                    }

                    const sj = detectSojson(s);
                    if (sj.isDetected) {
                        return {
                            primaryType: "sojson",
                            primaryConfidence: sj.confidence,
                            primaryResult: sj,
                            aaResult: { isDetected: false, confidence: 0 },
                            evalResult: { isDetected: false, confidence: 0 },
                            hasMultipleEncodings: false,
                        };
                    }

                    const aa = detectAAEncode(s);
                    const pk = detectPacker(s);
                    const jf = detectJSFuck(s);
                    const jjc = detectJJEncode(s);
                    const obf = detectObfuscator(s);

                    const candidates = [
                        aa.isDetected && { t: "AAEncode", c: aa.confidence, meta: aa },
                        pk.isDetected && { t: "Eval(Packer)", c: pk.confidence, meta: pk },
                        jf.isDetected && { t: "JSFuck", c: jf.confidence, meta: jf },
                        jjc.isDetected && { t: "JJEncode", c: jjc.confidence, meta: jjc },
                        obf.isDetected && { t: "Obfuscator", c: obf.confidence, meta: obf },
                    ]
                        .filter(Boolean)
                        .sort((a, b) => b.c - a.c);

                    if (!candidates.length) {
                        return {
                            primaryType: "Unknown",
                            primaryConfidence: 0,
                            aaResult: aa,
                            evalResult: { isDetected: pk.isDetected, confidence: pk.confidence },
                            hasMultipleEncodings: false,
                        };
                    }

                    const top = candidates[0];
                    const hasMulti = candidates.length > 1;

                    return {
                        primaryType: top.t,
                        primaryConfidence: top.c,
                        primaryResult: top.meta,
                        aaResult: aa,
                        evalResult: { isDetected: pk.isDetected, confidence: pk.confidence },
                        hasMultipleEncodings: hasMulti,
                    };
                }

                // 覆盖全局函数（务必在最后一个脚本）
                window.comprehensiveDetection = comprehensiveDetectionPatched;
                console.log("[detect-patch] real detector active");
            })();