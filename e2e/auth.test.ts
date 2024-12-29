import {
  expect,
  test,
} from '@playwright/test';

test.describe('인증 테스트', () => {
  test('로그인 프로세스', async ({ page }) => {
    await page.goto('/login');

    // 로그인 폼 입력
    await page.getByLabel('이메일').fill('test@example.com');
    await page.getByLabel('비밀번호').fill('password123');
    await page.getByRole('button', { name: '로그인' }).click();

    // 로그인 성공 후 리다이렉트 확인
    await expect(page).toHaveURL('/dashboard');

    // 로그인 상태 확인
    await expect(page.getByTestId('user-profile')).toBeVisible();
  });
});
