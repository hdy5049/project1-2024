# project1-2024
2024-2학기 캡스톤프로젝트 수업
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![js](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![js](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![js](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)

openAPI를 사용한 인공지능 시스템 실습

# openweathermap

지정된 장소의 현재 날씨를 표시
[실습해보기](https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35)

```javascript
$.ajax({
         type: "GET",
         url: 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35',
      }).done(function(response) {

            console.log(response)
            }).fail(function(error) {
         alert("!/js/user.js에서 에러발생: " + error.statusText);
      });
```

![스크린샷 2024-10-29 130129](https://github.com/user-attachments/assets/476555a3-579c-40e0-9f9b-d6fcb16a3c9a)

# openAI
chatGPT API키 활용하여 질의응답
[실습해보기1](https://api.openai.com/v1/chat/completions),
[실습해보기2](https://api.openai.com/v1/images/generations)
        

```javascript
  $.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        alert(response.choices[0].messge.content)
    }).fail(function(error){
        console.log(error)
        errormsg = error.status + " : " + error.responseJSON.error.code + " - " + error.responseJSON.error.code.messages
        alert(errormsg)
    }) 
```

```javascript
$.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/images/generations",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        // alert(response.choices[0].message.content)
        gimage.src = response.data[0].url
        gimage2.src = response.data[1].url
    }).fail(function(error){
        console.log(error)
        errormsg = error.status + " : " + error.responseJSON.error.code + " - " + error.responseJSON.error.message
        txtOut.value = errormsg
    })
```

# google cloud vision
구글 api키를 이용하기
[실습해보기](https://vision.googleapis.com/v1/images:annotate?key=)

```javascript
 $.ajax({
        type:"POST",
        url:'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLE_API_KEY,
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){    
        console.log(response)

    }).fail(function(error){
        console.log(error)

    })
```
개발순서
1. 소스수정
2. 소스저장
3. 스테이지
4. 커밋에 푸쉬
5. 커밋메세지


git 설정
git config --global user.name "hdy5049"
git config --global user.email "hdy5049@naver.com"

두번째 수정
2024-9-19 깃허브연동실습
로컬에서 편집함

google API 키를 이용해서 인물 표정 변화를 감지함
