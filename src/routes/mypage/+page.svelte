<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>마이페이지</h1>
<p>이메일: {data.user.email}</p>

<a href="/logout">로그아웃</a>
