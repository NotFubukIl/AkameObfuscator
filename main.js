const base85 = require("base85")
const JavaScriptObfuscator = require("javascript-obfuscator")
const minifyJS = require("uglify-js")
const crypto = require("crypto")
const rl = require("readline-sync")
const fs = require("fs")

if (!fs.existsSync("./output")) fs.mkdirSync("./output")
function retourFile(key, cKey, str) {
    var strrr = `\` Obfuscated With ❤️ By AkameObfuscator - !"Dialz_†#0069 - https://discord.gg/6F5tEVfYKM \`;` + "\x20\x20\x20\x20".repeat(40)
    return strrr +   JavaScriptObfuscator.obfuscate(`

const amongus = str => require(str)
const base = amongus("base85")
const crypto = amongus("crypto")

var key = "${key}"
var ckey = "${cKey}"

function decode(middle, key) {
    middle = base.decode(middle).toString()
    middle = Buffer.from(middle, "base64");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, middle.slice(middle.length - 28, middle.length - 16));
    decipher.setAuthTag(middle.slice(middle.length - 16));
    return decipher.update(middle.slice(0, middle.length - 28), null, 'utf8') + decipher.final('utf8');
}
eval(decode("${str}", decode(key, ckey)))`, opts()).getObfuscatedCode()
}

function main() {
    var key = getRandomChiffre(32)
    var cipherKey = getRandomChiffre(32)
    var encodedKey = encode(key, cipherKey)
    var file = rl.question("Drag The Wanted File Here: ")
    var fileName = file.split(/(\/|\\)/g).pop()
    if (!fileName.endsWith(".js")) return console.log("You Can't Obfuscate A Non-JS File !")
    var content = retourFile(encodedKey, cipherKey, encode(JavaScriptObfuscator.obfuscate(fs.readFileSync(file).toString()).getObfuscatedCode(), key))
    fs.writeFileSync(`./output/obfuscated-${fileName}`, content)
    console.log("Obfuscated !")
}

main()

function encode(key, ckey) {
    var start = new crypto.randomBytes(12);
    var cipher = crypto.createCipheriv("aes-256-gcm", ckey, start);
    return base85.encode(Buffer.concat([cipher.update(key, 'utf8'), cipher.final(), start, cipher.getAuthTag()]).toString("base64"))
}



function getRandomChiffre(len) {
    var bbb = "0123456789"
    var retur = ""
    while (retur.length !== len) {
        var n = bbb[Math.floor(Math.random() * bbb.length)]
        retur += n
    }
    return retur
}

function opts() {
    return {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: true,
        debugProtection: true,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        identifiersPrefix: "AkameObfuscator",
        numbersToExpressions: false,
        renameGlobals: true,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayCallsTransform: false,
        stringArrayCallsTransformThreshold: 1,
        stringArrayEncoding: ["rc4"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 12,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 1,
        unicodeEscapeSequence: false
    }
}