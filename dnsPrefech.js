const fs = require('fs') 
const urlRegex = require('url-regex'); 
const { parse } = require('node-html-parser') 

const path = './dist/js/'
const domainArrSet = new Set() 

function splitWithSlash(str) {
    let count = 0
    let lastIndex;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '/') {
            count = count + 1
            if (count == 3) {
                lastIndex = i
                break
            }
        }
    }
    return str.slice(0, lastIndex)
}

function countChar(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == char) {
            count++;
        }
    }
    return count;
}

function extractDomain(str) {
    const regex = /(https?:\/\/[^\s]+\.[a-zA-Z]{2,})/g;
    const matches = str.match(regex);
    const urls = [];
    if (matches) {
        for (let i = 0; i < matches.length; i++) {
            urls.push(matches[i].trim());
        }
    }
    return urls[0];
}

function isJsFile(str) {
    return str.slice(-2) === 'js'
}

function readEachFile(url) {
    fs.readFile(url, { encoding: "utf-8" }, function (err, content) {
        if (err) {
            throw err
        }
        const matchArr = content.match(urlRegex({ strict: true }))
        if (matchArr) {
            for (const item of matchArr) {
                let domain = extractDomain(item)
                if (domain) {
                    let count = countChar(domain, '/')
                    if (count == 2) {
                        domainArrSet.add(domain)
                    } else {
                        let domain2 = splitWithSlash(domain)
                        let num = countChar(domain2, ':')
                        if (num == 1) {
                            domainArrSet.add(domain2)
                        } else {
                            domainArrSet.add(domain2.slice(0, -6))
                        }
                    }
                }
            }
        }
    })
}
fs.readdir(path, (err, files) => {
    if (err) {
        throw err
    }
    for (let file of files) {
        if (isJsFile(file)) {
            readEachFile(path + file)
        }
    }
    process.nextTick(showDomainArrSet)
})

function showDomainArrSet() {
    setTimeout(() => {
        for (const domain of domainArrSet) {
            addLink(domain)
        }
    }, 170);
}

function addLink(domain) {
    const link = `<link href="${domain}" rel="dns-prefetch">\n`
    const html = fs.readFileSync('./dist/index.html', 'utf-8')
    const root = parse(html)
    const head = root.querySelector('head')
    head.insertAdjacentHTML('afterbegin', link)
    fs.writeFileSync('./dist/index.html',root.toString())

}