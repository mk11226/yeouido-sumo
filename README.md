# YEOUIDO DRIVE · TEAM 08 증권맨의 삶

여의도 SUMO 자율주행 프로젝트 페이지입니다.

- 공개 주소: https://mk11226.github.io/yeouido-sumo/
- 프로젝트 코드: https://github.com/mk11226/yeouido-ppo-submission
- 데이터: https://huggingface.co/datasets/mk11226/yeouido_sumo

## 자료 링크 수정

`project.json`의 `presentation`에 공개 PDF 링크, `video`에 공개 영상 링크를 입력하고 main 브랜치에 push합니다. 값이 null이면 업로드 예정으로 표시됩니다.

## 페이지 수정 및 배포

`index.html`, `style.css`, `app.js`를 수정합니다. main 브랜치의 루트 디렉터리를 GitHub Pages로 자동 배포합니다. 별도 빌드는 필요하지 않습니다.

## 로컬 확인

```bash
python3 -m http.server 8766
```

지도는 실제 SUMO 도로망과 OpenStreetMap 배경을 바탕으로 만든 설명용 그림입니다. 표시 경로는 모델의 실제 주행 결과가 아닙니다. 로컬 Noto Sans KR 글꼴 라이선스는 assets/OFL.txt에 있습니다.
