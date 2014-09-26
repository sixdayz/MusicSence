exec { 'yum update -y':
    path => '/usr/bin',
}

package { 'vim':
    ensure => present,
}

service { 'iptables':
    ensure => stopped
}

file { '/var/www/':
    ensure => 'directory',
}

include nginx
