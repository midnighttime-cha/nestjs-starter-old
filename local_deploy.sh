#/bin/bash
datetime="`date '+%D %T'`"

git add .
echo "####### Git Add ALL #######"
git commit -m "Master commit: $1 Datetime: $datetime"
echo "####### Git commit master #######"
git pull origin master
echo "####### Git pull master #######"
git push -u origin master
echo "####### Push Git Master #######"

git switch develop
echo "####### Git switch to develop #######"
git add .
echo "####### Git add all #######"
git commit -m "develop commit: $1 Datetime: $datetime"
echo "####### Git commit develop #######"

git pull origin master
echo "####### Git pull from master #######"
git push -u origin develop
echo "####### Git push to develop #######"

git switch master
echo "####### Git switch to master #######"