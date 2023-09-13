module.exports = {
    // cy.xpath()
    ulTabMenu: "/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]",
    btnAksi: "(//button[contains(text(),'Aksi')])[1]",
    btnDetail: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[5]/div[1]/div[2]/div[1]/ul[1]/li[1]/a[1]',
    btnUbah: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[5]/div[1]/div[2]/div[1]/ul[1]/li[2]/a[1]',
    btnDelete: '[data-cy="document__action-button--delete"]',
    btnArchive: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[5]/div[1]/div[2]/div[1]/ul[1]/li[4]/button[1]',
    tabArchiveDocument: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]/li[1]/a[1]',
    textArchiveDocument: "/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]/li[1]/a[1]/span[1]",
    rowNewData: "(//tr)[2]",
    search: '[data-cy="search-bar__input__documents"]',
    btnClearSearch: '[data-cy="search-bar__clear-button__documents"]',
    tableRow: "/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]",
    tableBody: "//tbody",

    // Empty State Search
    imgNotFound: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/img[1]',
    messageDataNotFound: '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/p[1]',

    // cy.Contains()
    btnAdd: '[data-cy="documents__add-button"]',
}