# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "parallels/centos-6.5"
  config.vm.box_check_update = false
  config.vm.network "forwarded_port", guest: 80, host: 8000
  # config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"
  # config.ssh.forward_agent = true
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path   = 'puppet/manifests'
    puppet.module_path      = 'puppet/modules'
    puppet.manifest_file    = 'init.pp'
  end
end
