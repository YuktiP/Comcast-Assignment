import { Component, isDevMode, OnInit } from "@angular/core";

@Component({
    selector:'app-language-select',
    templateUrl:'./language-select.component.html'
})
export class LanguageSelectComponent implements OnInit{

    prodMode = !isDevMode()
    languages : any[] = [];
    selectedLocale!: string;
    ngOnInit(): void {
        this.setLanguages();
        this.setDefaults();
    }

    setLanguages(){
        this.languages.push({code : 'en-US', text : 'English'});
        this.languages.push({code : 'es', text : 'Spanish'});
        this.languages.push({code : 'fr', text : 'French'});
    }

    languageChange(locale : string){
        window.location.href = `/${locale}`
    }

    setDefaults(){
        this.selectedLocale = window.location.pathname.split('/')[1]
        let siteLocale = this.languages.find( (l) => l.code === this.selectedLocale)?.text;
        if (!siteLocale) {
            this.languageChange(this.languages[0].code)
        }
    }
    
}