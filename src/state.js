// Estado mutable compartido entre módulos.
// Los `let` exportados no se pueden reasignar desde otro módulo, por eso se usa un objeto.
export const state = {
  menuOpen: false,
  chatOpen: false,
  revealObserver: undefined,
};
