describe('기본 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('메인 페이지가 로드됨', () => {
    cy.get('h1').should('be.visible');
  });

  it('네비게이션이 작동함', () => {
    cy.get('nav').should('exist');
    cy.get('nav a').first().click();
    cy.url().should('include', '/some-path');
  });
});
