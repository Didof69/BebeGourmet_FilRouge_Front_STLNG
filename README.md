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

# Installation NgSelect, pour formulaire selectif d'ajout d'aliment: (https://ng-select.github.io/ng-select#/multiselect)
```bash
npm install --save @ng-select/ng-select
```

## Dans le app-module.ts, ajouter import:
```
import { NgSelectModule } from '@ng-select/ng-select'; 
import { FormsModule } from '@angular/forms';

@NgModule({ 
  declarations: [AppComponent], 
  imports: [
    NgSelectModule, 
    FormsModule, 
    ]
  bootstrap: [AppComponent]
   }) 
  
  export class AppModule {}

```
## Dans le angularjson, ajouter styles:
````
"styles": [
          "node_modules/@ng-select/ng-select/themes/default.theme.css",
          "node_modules/bootstrap/dist/css/bootstrap.min.css",
          "src/styles.css"
       ],
``
