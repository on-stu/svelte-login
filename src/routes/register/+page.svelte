<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>회원가입</h1>

<form use:enhance method="post">
	<label>
		<span>이메일</span>
		<input type="email" name="email" />
	</label>
	<label>
		<span>비밀번호</span>
		<input type="password" name="password" />
	</label>
	<label>
		<span>비밀번호 확인</span>
		<input type="password" name="confirmPassword" />
	</label>
	<label>
		<span>이름</span>
		<input type="text" name="name" />
	</label>
	<button type="submit">회원가입</button>
</form>
