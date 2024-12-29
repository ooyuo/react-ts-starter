import {
  expect,
  test,
} from '@playwright/test';

test.describe('API 테스트', () => {
  test('데이터 로딩 확인', async ({ page }) => {
    await page.goto('/');

    // 데이터 로딩 상태 확인
    await expect(page.getByTestId('loading')).toBeVisible();

    // 데이터 로드 완료 후 컨텐츠 확인
    await expect(page.getByTestId('content')).toBeVisible();

    // 에러 메시지가 없는지 확인
    await expect(page.getByTestId('error')).not.toBeVisible();
  });
});
