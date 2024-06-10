import { ModalContentType } from './modal-content.type';

export class ModalContent {
  title: string;
  content: string;

  constructor(modalContent: ModalContentType) {
    this.title = modalContent.title;
    this.content = modalContent.content;
  }
}
