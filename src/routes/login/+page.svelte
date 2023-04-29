<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>로그인</h1>

<form use:enhance method="post">
	<label>
		<span>이메일</span>
		<input type="email" name="email" />
	</label>
	<label>
		<span>비밀번호</span>
		<input type="password" name="password" />
	</label>
	<button type="submit">로그인</button>
</form>
