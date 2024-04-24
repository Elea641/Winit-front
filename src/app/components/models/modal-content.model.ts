export type ModalContentType = {
  title: string;
  content: string;
};

export class ModalContent {
  title: string;
  content: string;

  constructor(modalContent: ModalContentType) {
    this.title = modalContent.title;
    this.content = modalContent.content;
  }
}
