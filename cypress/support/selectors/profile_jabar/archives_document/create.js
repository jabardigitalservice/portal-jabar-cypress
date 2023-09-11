module.exports = {
    fileUpload: '[data-cy="archive-document-dropzone__input-file"]',
    btnDeleteFile: '[data-cy="archive-document-dropzone-upload-progress__button-delete"]',
    sectionFileUpload: '[data-cy="archive-document-dropzone-upload-progress"]',
    titleDocument: '[data-cy="archive-document-form__title"]',
    dropdownCategory: '[data-cy="archive-document-form__category"]',
    textareaDescDocument: '[data-cy="archive-document-form__description"]',

    // Alert Validation
    alertWrongUpload: ".font-lato",
    alertOver5mb: '[data-cy="archive-document-form__error-message-file"]',
    alertText50: ".jds-form-control-error-message",
    alertMaxTitle: '[data-cy="archive-document-form__error-message-title"]',
    alertMandatoryTitle: '[data-cy="archive-document-form__error-message-title"]',
    alertMandatoryCategory: '[data-cy="archive-document-form__error-message-category"]',
    alertMandatoryDesc: '[data-cy="archive-document-form__error-message-description"]',
    alertLinkWrong: ".jds-form-control-error-message",
    alertResolution: ".font-lato",

    // Btn Component
    btnSaveDraft: '[data-cy="archive-document-form__button-draft"]',
    btnPublish: '[data-cy="archive-document-form__button-publish"]',
    btnBack: '[data-cy="archive-document-form__button-back"]',

    // Modals Component
    btnNo: '[data-cy="archive-document-form__confirmation-button-dismiss"]',
    btnYesSure: '[data-cy="archive-document-form__confirmation-button-cancel"]',
    btnYesPublish: '[data-cy="archive-document-form__confirmation-button-publish"]',
    btnYesDraft: '[data-cy="archive-document-form__confirmation-button-draft"]',
    modalsTitle: '[data-cy="archive-document-form__confirmation-modal-title"]',
    modalsMessageTitle: '[data-cy="archive-document-form__message-modal-title"]',
    modalsBody: '[data-cy="archive-document-form__confirmation-modal-body"]',
    modalsMessageBody: '[data-cy="archive-document-form__message-modal-body"]',
}