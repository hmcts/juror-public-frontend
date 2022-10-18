#!/bin/sh
 
OWASPDC_DIRECTORY=$HOME/OWASP-Dependency-Check-PUBLIC
DATA_DIRECTORY="$OWASPDC_DIRECTORY/data"
REPORT_DIRECTORY="$OWASPDC_DIRECTORY/reports"
 
if [ ! -d "$DATA_DIRECTORY" ]; then
    echo "Initially creating persistent directories"
    mkdir -p "$DATA_DIRECTORY"
    chmod -R 777 "$DATA_DIRECTORY"
 
    mkdir -p "$REPORT_DIRECTORY"
    chmod -R 777 "$REPORT_DIRECTORY"
fi
 
# Make sure we are using the latest version
docker pull owasp/dependency-check
 
docker run --rm \
    --volume $(pwd):/src \
    --volume "$DATA_DIRECTORY":/usr/share/dependency-check/data \
    --volume "$REPORT_DIRECTORY":/report \
    owasp/dependency-check \
    --scan ./node_modules \
    --propertyfile "/src/.properties" \
    --suppression "/src/depcheck-suppression.xml" \
    --disableNodeAuditCache \
    --nodeAuditSkipDevDependencies \
    --nodePackageSkipDevDependencies \
    --format "ALL" \
    --project "Juror Digital Public Portal" \
    --out /report
    # Use suppression like this: (/src == $pwd)
    # --suppression "/src/security/dependency-check-suppression.xml"