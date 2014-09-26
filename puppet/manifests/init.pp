exec { 'yum update -y':
    path => '/usr/bin',
}

package { 'vim':
    ensure => present,
}

file { '/var/www/':
    ensure => 'directory',
}

include nginx
