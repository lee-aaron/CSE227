#/bin/bash

# iptables -A DOCKER-USER -i eth0 -s 8.8.8.8 -p tcp -m conntrack --ctorigdstport 3000 --ctdir ORIGINAL -j ACCEPT
# iptables -A DOCKER-USER -i eth0 -s 4.4.4.4 -p tcp -m conntrack --ctorigdstport 3000 --ctdir ORIGINAL -j ACCEPT
# iptables -A DOCKER-USER -i eth0 -p tcp -m conntrack --ctorigdstport 3000 --ctdir ORIGINAL -j DROP

iptables -I DOCKER-USER -i ext_if ! -s 192.168.1.1 -j DROP