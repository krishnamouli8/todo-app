export type ViewState = 'landing' | 'login' | 'signup' | 'dashboard';

export interface NavProps {
  onNavigate: (view: ViewState) => void;
}
