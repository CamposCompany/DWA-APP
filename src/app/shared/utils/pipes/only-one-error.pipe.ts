import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyOneError',
  standalone: true
})
export class OnlyOneErrorPipe implements PipeTransform {

  transform(errors: { [key: string]: any }): string | null {
    if (!errors) {
      return null;
    }

    const errorKey = Object.keys(errors)[0];
    const errorMessage = this.getError(errorKey);
    return errorMessage;
  }

  private getError(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return 'Esse campo é obrigatório.';
      case 'weakPassword':
        return 'Senha fraca, utilize ao menos uma letra maiuscula e um caracter especial (@, !, #...).';
      case 'passwordMismatch':
        return 'Senhas não conferem.';
      case 'mask':
        return 'Formato inválido'
      default:
        return 'Valor inválido.';
    }
  }

}
