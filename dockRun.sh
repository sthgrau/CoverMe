#!/bin/sh

if [ -z "$DBI" ] ; then
    DBI="mongo"
fi

if [ -z "$LOCALPORT" ] ; then
    LOCALPORT=8088
fi

if [ -z "`docker images -q $DBI`" ] ; then
    echo "Docker image for $DBI needs to be installed"
    echo "Yes, I could do it, but you may not want me to"
    echo "      docker pull $DBI && docker run -d $DBI"
    exit
fi

if [ -z "`docker ps -q -f ancestor=$DBI`" ] ; then
    echo "Docker image for $DBI needs to be running"
    echo "Yes, I could do it, but you may not want me to"
    echo "      docker run -d $DBI"
    exit
fi

if [ ! -z "`netstat -nl | grep $LOCALPORT`" ] ; then
    echo "Something is already listening on port $LOCALPORT"
    echo "Stop that process or change the variable LOCALPORT to another port"
    exit
fi

IMG=`docker ps -q -f ancestor=$DBI`
DBS=`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $IMG`

docker build -t coverme . || exit 1
docker run --rm -d -e DBS=$DBS -p ${LOCALPORT}:8088 coverme
