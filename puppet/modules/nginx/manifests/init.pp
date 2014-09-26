class nginx {

    file { 'nginx-repo':
        path    => '/etc/yum.repos.d/nginx.repo',
        ensure  => file,
        source  => 'puppet:///modules/nginx/nginx.repo'
    }   

    file { '/var/www/musicsence': 
        ensure => 'link', 
        target => '/vagrant', 
    }

    package { 'nginx':
        ensure  => 'present',
        require => [
            File['nginx-repo'],
            Exec['yum update -y']
        ]
    }

    service { 'iptables':
        ensure  => stopped
    }

    service { 'nginx':
        ensure  => running,
        require => [
            Package['nginx'],
            Service['iptables']
        ]
    }

    file { 'default-nginx-disable':
        path    => '/etc/nginx/conf.d/default.conf',
        ensure  => absent,
        require => Package['nginx'],
    }

    file { 'musicsence-nginx-enable':
        path    => '/etc/nginx/conf.d/musicsence.conf',
        ensure  => file,
        source  => 'puppet:///modules/nginx/vhost.conf',
        notify  => Service['nginx'],
        require => File['default-nginx-disable']
    }
}
