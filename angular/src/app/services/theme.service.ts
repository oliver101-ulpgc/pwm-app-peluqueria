import {Injectable} from '@angular/core';

enum ThemeStyle {
  LIGHT,
  DARK
}

@Injectable({
  providedIn: "root"
})
export class ThemeService {

  setTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      const style: ThemeStyle = (storedTheme === 'dark')
        ? ThemeStyle.DARK
        : ThemeStyle.LIGHT;
      this.applyTheme(style);
    } else if (prefersDarkScheme) {
      this.applyTheme(ThemeStyle.DARK);
    } else {
      this.applyTheme(ThemeStyle.LIGHT);
    }
  }

  applyTheme(theme: ThemeStyle) {
    switch (theme) {
      case ThemeStyle.LIGHT:
        this.loadTheme('light-theme');
        localStorage.setItem('theme', 'light');
        break;
      case ThemeStyle.DARK:
        this.loadTheme('dark-theme');
        localStorage.setItem('theme', 'dark');
        break;
    }
  }

  loadTheme(themeName: string) {
    const link = document.getElementById('theme-link') as HTMLLinkElement;

    if (link) {
      link.href = `assets/styles/theme-${themeName}.css`;
    } else {
      const newLink = document.createElement('link');
      newLink.id = 'theme-link';
      newLink.rel = 'stylesheet';
      newLink.href = themeName;
      document.head.appendChild(newLink);
    }
  }
}
