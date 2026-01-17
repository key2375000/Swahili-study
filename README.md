
# 내공스 (Naegongseu) - Swahili Leap

현지 선교사 및 여행자를 위한 스와힐리어 패턴 학습 애플리케이션입니다.

## 주요 기능
- **10일 단위 유닛 학습**: 총 200일 과정의 체계적인 커리큘럼.
- **AI 기반 문제 생성**: Gemini API를 사용하여 매일 새로운 퀴즈 및 테스트 생성.
- **실시간 발음 연습**: 브라우저 오디오 API를 사용한 사용자 발음 녹음 및 재생.
- **텍스트-음성 변환(TTS)**: Gemini TTS 모델을 통한 정확한 스와힐리어 발음 청취.
- **개인 단어장 및 사전**: 학습 중 발견한 단어를 저장하고 실시간으로 단어 검색 가능.
- **게임화 요소**: 스트릭(Streak), XP, 레벨 졸업 테스트 및 최종 마스터 챌린지.

## 기술 스택
- **Frontend**: React 19, Tailwind CSS
- **AI**: Google Gemini API (@google/genai)
- **Deployment**: Single Page Application (ESM modules)