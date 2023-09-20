# Front_BB_Gourmet

## Etape 1 : lancer un nouveau projet angular :
```bash
ng new front_bb_gourmet
```

## Etape 2 : ajouter Bootstrap
```bash
npm install bootstrap
```

### dans angular.jon
```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

## Etape 3 : créer des pages et des composants
```bash
ng generate component xyz
```

# config NgFor dans app.module.ts
```
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
...


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```