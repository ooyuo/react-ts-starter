OUT=$(pnpm install --dry-run 2>&1 | grep -E "WARN.*peer.*")
if [ -z "$OUT" ]; then
  echo "✅ 피어 의존성 검사 완료: 문제가 발견되지 않았습니다."
else
  echo "⚠️ 피어 의존성 경고:"
  echo "----------------------------------------"
  echo "$OUT"
  echo "----------------------------------------"
  echo "일부 피어 의존성이 올바르게 충족되지 않았습니다. pnpm why <package-name> 명령어로 자세한 정보를 확인하세요."
  exit 1
fi