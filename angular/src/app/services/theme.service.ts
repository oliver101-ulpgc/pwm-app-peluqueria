import {Injectable} from '@angular/core';

enum ThemeStyle {
  LIGHT = 'light-theme',
  DARK = 'dark-theme'
}

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  setTheme() {
    const storedTheme: string | null = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      this.loadTheme((storedTheme === 'dark')
        ? ThemeStyle.DARK
        : ThemeStyle.LIGHT
      );
      return;
    }
    if (prefersDarkScheme)
      this.loadTheme(ThemeStyle.DARK);
    else
      this.loadTheme(ThemeStyle.LIGHT)
  }

  changeTheme(style: ThemeStyle) {
    this.loadTheme(style);
    localStorage.setItem('theme', (style == ThemeStyle.LIGHT) ? 'light' : 'dark');
  }

  private loadTheme(theme: ThemeStyle) {
    const link = document.getElementById('theme-link') as HTMLLinkElement;

    if (link) {
      link.href = `assets/themes/${theme}.css`;
    } else {
      const newLink = document.createElement('link');
      newLink.id = 'theme-link';
      newLink.rel = 'stylesheet';
      newLink.href = theme;
      document.head.appendChild(newLink);
    }
  }
}
