import { OverlayContainer } from '@angular/cdk/overlay';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-chooser',
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.scss']
})
export class ThemeChooserComponent implements OnInit {

  private overlay: HTMLElement;
  private master: HTMLElement | undefined;
  private body: HTMLElement | undefined;//sweetalert purposes
  public currentTheme: string;
  public items : any[];
  constructor(private overlayContainer: OverlayContainer
  ) {
    this.overlay = overlayContainer.getContainerElement();

    this.currentTheme = 'app-default-theme';//default
    this.items = "app-default-theme.Light-Indigo,app-dark-theme.Dark-Amber".split(',').map(tp => {
      return {
        class: tp.split('.')[0],
        text:tp.split('.')[1],
      }
    });
    
  }

  public themeChanged(theme: string): void {


      this.overlay.classList.toggle(this.currentTheme);
      this.overlay.classList.toggle(theme);
      this.master?.classList.toggle(this.currentTheme);
      this.master?.classList.toggle(theme);
      this.body?.classList.toggle(this.currentTheme);
      this.body?.classList.toggle(theme);

      this.currentTheme = theme;
  }

  ngOnInit(): void {
    this.master = document.getElementsByClassName('master')[0] as HTMLElement;
    this.body = document.body;
  }

}
