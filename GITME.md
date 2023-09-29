# GITHUB

## Etape 1 : cloner le projet 
```bash
git clone http://du projet
```

## Etape 2 : créer une branche pour travailler 
```bash
git checkout -b nomdelabranche
```

## Etape 3 : travailer sur sa branche

## Etape 4 : pusher sa branche
```bash
git add .
git commit -m "nom du commit"
git push
```

## Etape 5 : refraichir Git Graph
```bash
git fetch
```

## Etape 7 : revenir sur la branche Main et recupérer la dernière version de main
```bash
git checkout main
git pull
```

## Etape 7 : revenir sur sa branche de travail et merger avec la Main
```bash
git checkout branchedetravail
git merge main
```