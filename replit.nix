{
  description = "A basic repl.it environment";
  
  deps = {
    channels = {
      nixpkgs = {
        url = "github:NixOS/nixpkgs/nixos-unstable";
      };
    };
  };
  
  env = {
    LANG = "en_US.UTF-8";
  };
  
  packages = with import <nixpkgs> {}; [
    nodejs_20
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
} 