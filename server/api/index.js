var nodegit = require('nodegit');
var path = require('path');

export default function() {
	const api = Router();
  const localVersionOfRepo = null;

  clone(repoUrl, local, user, pass)
  {
    var cloneOpts = {
      fetchOpts: {
        callbacks: {
            credentials: function(repoUrl, user)
            {
              return nodegit.Cred.userpassPlaintextNew(user,pass)
            }
          }
        }
    };

    nodegit.Clone(repoUrl, local, cloneOpts).then(function(repo) {
        console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
        localVersionOfRepo = repo;
    }).catch(function (err) {
        console.log(err);
    });
  }

  api.post('/clone/:repoUrl', (req, res) => {
    const repoUrl = req.params.repoUrl; //https://github.com/phase2interactive/Sonic.Menus.git //Url to pull from
    const local = req.body.local; //./sonicmenus
    const pass = req.body.pass; //4wWYZ5quPN88Aum4 bitbucket test app pass
    const user = req.body.user_name;

    var cloneOpts = {
      fetchOpts: {
        callbacks: {
            credentials: function(repoUrl, user)
            {
              return nodegit.Cred.userpassPlaintextNew(user,pass)
            }
          }
        }
    };

    //Clone opts provides the auth layer support.
    nodegit.Clone(repoUrl, local, cloneOpts).then(function(repo) {
        console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
        localVersionOfRepo = repo;
    }).catch(function (err) {
        console.log(err);
    });
  });




  api.post('/updateBitBucketRepo', (req,res) =>
  {
     const gitUrl = req.body.gitUrl; //update post to bitbucket version // url to post to
     const bitbucketUrl = req.body.bitbucketUrl;
     const local = req.body.local; //./sonicmenus
     const bitpass = req.body.bit_pass; //4wWYZ5quPN88Aum4 // pass for destination
     const bituser = req.body.bit_user_name; //user for destination
     const gitpass = req.body.git_pass;
     const gituser = req.body.git_user_name;
     const branch = req.body.branch; //branch to fetch updates for.

     //Clone Git Repository
     Clone(gitUrl,local, gitUser, gitpass);
     //Local repo should be available now... Should check out master but can be provided
     var checkoutOpts = {
        checkoutStrategy: nodegit.Checkout.STRATEGY.FORCE
     };

     localVersionOfRepo.checkoutBranch(branch, checkoutOpts);
     console.log("checked out " + branch);

     






  });

  return api;

}


/*if(localVersionOfRepo == null)
{
  nodegit.Repository.openExt(local,{},{}).then(function(repository){
     localVersionOfRepo = repository;
  });
}

nodegit.Repository.open(local).then(function(repo) {
    console.log("Using " + repo.path());
}).catch(function(err) {
    console.log(err);
});*/
