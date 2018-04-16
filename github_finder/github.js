class GitHub {
  constructor() {
    this.cliend_id = '794767428f0bb9d2831b';
    this.client_secret = 'a24c95bded2656f5ee7d3e823765e984f6a26c3c';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`http://api.github.com/users/${user}?client_id=${this.cliend_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`http://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.cliend_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}