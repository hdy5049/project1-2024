GOOGLEAPI_KEY = ""
function processFile(event) {
    const content = event.target.result;
    imagestring = content.replace(/^data:image\/(jpeg|png);base64,/, '');  // JPEG 또는 PNG 형식의 이미지를 처리
    document.getElementById("gimage").src = content;  // 이미지 미리보기 표시
}

function uploadFiles(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);  // 파일을 Base64로 인코딩
}

function analyze() {
    if (!imagestring) {
        alert("먼저 이미지를 업로드하세요.");
        return;
    }

    const data = {
        requests: [{
            image: {
                content: imagestring  // Base64로 인코딩된 이미지 데이터
            },
            features: [{
                type: "FACE_DETECTION",  // 얼굴 감지 기능
                maxResults: 100
            }]
        }]
    };


    $.ajax({
        type: "POST",
        url: 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLEAPI_KEY,  // API 키를 사용하여 요청
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        const faces = response.responses[0].faceAnnotations;  // 얼굴 인식 결과
        if (faces && faces.length > 0) {
            let resultText = `총 ${faces.length}개의 얼굴이 감지되었습니다:\n\n`;
            faces.forEach((face, index) => {
                resultText += `얼굴 #${index + 1}:\n`;
                resultText += `  감정 표현: ${detectEmotions(face)}\n`;
                resultText += `  기울기 (좌우): ${face.tiltAngle}\n`;
                resultText += `  기울기 (위아래): ${face.panAngle}\n`;
                resultText += `  기울기 (좌우 회전): ${face.rollAngle}\n\n`;
            });
            $("#result").val(resultText);  // 결과를 textarea에 표시
        } else {
            $("#result").val("얼굴을 감지하지 못했습니다.");
        }
    }).fail(function (error) {
        console.error(error);
        $("#result").val("얼굴 인식 중 오류가 발생했습니다.");
    });
}

function detectEmotions(face) {
    const likelihoods = {
        VERY_UNLIKELY: "거의 없음",
        UNLIKELY: "적음",
        POSSIBLE: "가능성 있음",
        LIKELY: "높음",
        VERY_LIKELY: "매우 높음"
    };

    let emotions = '';
    emotions += `웃음: ${likelihoods[face.joyLikelihood]}\n`;
    emotions += `슬픔: ${likelihoods[face.sorrowLikelihood]}\n`;
    emotions += `화남: ${likelihoods[face.angerLikelihood]}\n`;
    emotions += `놀람: ${likelihoods[face.surpriseLikelihood]}\n`;

    return emotions;
}