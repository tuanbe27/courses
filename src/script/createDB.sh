#!/bin/bash
echo "ENTER DATA BASE NAME:"
read dbname

echo "ENTER DATABASE USER NAME:"
read user

echo "ENTER DATASE PASSWORD:"
read -s password

echo "Dropping database if exists..."
mysql -u $user -p$password -e "DROP SCHEMA IF EXISTS ${dbname};"
echo "Database successfully dropped!"


echo "Creating new MySQL database..."
mysql -u $user -p$password -e "CREATE DATABASE ${dbname}"
echo "Database successfully created!"

mysql -u $user -p$password $dbname<"seeder.sql"

