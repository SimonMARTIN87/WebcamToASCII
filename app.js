
// 0 - 64 - 127 - 191 - 255

function getCharacterFromByte(byte) {
    if (byte < 65) {
        return '@';
    } else if (byte < 128) {
        return '+';
    } else if (byte < 192) {
        return '-';
    } else {
        return '&nbsp;';
    }
}

async function run () {
    try {
        // get HTMLElements
        const videoTag = document.getElementById('hiddenVideo');
        const canvasTag = document.getElementById('mainCanvas');
        const resultDiv = document.getElementById('result');
        const fpsDiv = document.getElementById('fps');

        // get webcam
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });

        videoTag.srcObject = stream;

        const draw = () => {
            const start = Date.now();

            const canvasCtx = canvasTag.getContext('2d');
            
            // put data in canvas, just to downscale it and put it in Grayscale
            canvasCtx.filter = 'grayscale(1)';
            canvasCtx.drawImage(videoTag,0,0, canvasTag.width, canvasTag.height);

            const imageData = canvasCtx.getImageData(0,0,canvasTag.width, canvasTag.height);
            const rawData = imageData.data;

            // rawData format is: [R1,G1,B1,A1,R2,G2,B2,A2,... Rx, Gx, Bx, Ax] 

            const nbBytesByLine = canvasTag.width * 4;

            let resultStr = '';
            for(const index in rawData) {
                if (index%4 === 0) {

                    resultStr += getCharacterFromByte( rawData[index] );

                    if (index > 0 && index%nbBytesByLine === 0) {
                        resultStr += "<br/>";
                    }
                }
            }

            resultDiv.innerHTML = resultStr;

            const time = Date.now() - start;
            console.log({time});
            fpsDiv.textContent = `${(1000/time).toFixed(1)} FPS`;

            requestAnimationFrame(draw);
        }

        draw();

        
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', run );


