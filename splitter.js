const fs = require('fs');

function splitICSFile(icsContent, maxSizeInMB = 1) {
    const maxSize = maxSizeInMB * 1024 * 1024;
    const lines = icsContent.split('\n');
    const header = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Split ICS//EN\n';
    const footer = 'END:VCALENDAR';
    
    let currentFile = header;
    const files = [];
    let currentSize = header.length;
    let insideEvent = false;
    let currentEvent = '';
    
    for (let line of lines) {
        if (line.startsWith('BEGIN:VEVENT')) {
            insideEvent = true;
            currentEvent = line + '\n';
        } else if (insideEvent) {
            currentEvent += line + '\n';
            if (line.startsWith('END:VEVENT')) {
                insideEvent = false;
                const potentialSize = currentSize + currentEvent.length;
                
                if (potentialSize + footer.length > maxSize) {
                    currentFile += footer;
                    files.push(currentFile);
                    currentFile = header + currentEvent;
                    currentSize = header.length + currentEvent.length;
                } else {
                    currentFile += currentEvent;
                    currentSize = potentialSize;
                }
                currentEvent = '';
            }
        }
    }
    
    if (currentFile !== header) {
        currentFile += footer;
        files.push(currentFile);
    }
    
    return files;
}

// メインの処理
const inputFile = process.argv[2];
if (!inputFile) {
    console.error('使用方法: node splitter.js 入力ファイル.ics');
    process.exit(1);
}

try {
    const icsContent = fs.readFileSync(inputFile, 'utf8');
    const splitFiles = splitICSFile(icsContent);
    
    // 分割したファイルを保存
    splitFiles.forEach((content, index) => {
        const outputFile = `split_${index + 1}.ics`;
        fs.writeFileSync(outputFile, content);
        const sizeInMB = (content.length / 1024 / 1024).toFixed(2);
        console.log(`${outputFile}を作成しました（${sizeInMB}MB）`);
    });
    
    console.log(`\n合計${splitFiles.length}個のファイルに分割しました`);
} catch (error) {
    console.error('エラーが発生しました:', error.message);
}
