import { expect, test } from '@playwright/test';

test.describe('네비게이션 테스트', () => {
  test('메인 페이지 방문', async ({ page }) => {
    await page.goto('/');

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/React TS Starter/);

    // 메인 헤더 확인
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('네비게이션 동작 확인', async ({ page }) => {
    await page.goto('/');

    // 네비게이션 링크 클릭
    await page.getByRole('link', { name: '메뉴' }).click();

    // URL 변경 확인
    await expect(page).toHaveURL(/.*menu/);

    // 새 페이지 콘텐츠 확인
    await expect(page.getByRole('heading')).toBeVisible();
  });
});
