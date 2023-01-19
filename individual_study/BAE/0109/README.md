# 0109

## 피그마 작성

* 메인페이지

![](README_assets/2023-01-09-23-27-01-image.png)

* 로그인 페이지

![](README_assets/2023-01-09-23-27-57-image.png)

* 회원가입

![](README_assets/2023-01-09-23-28-21-image.png)

![](README_assets/2023-01-09-23-28-41-image.png)

* 마이페이지

![](README_assets/2023-01-09-23-29-28-image.png)

* 프로필 페이지

![](README_assets/2023-01-09-23-29-04-image.png)

## 리액트

## JSX

JSX는 자바스크립트의 확장 문법으로 XML과 유사한 형식이다. 자바스크립트의 공식적인 문법은 아니지만, 코드를 React.createElement(’div’, null, ‘Hello’) 등으로 계속 쓰는 것 보다 훨씬 편해짐

### JSX 장점

- 보기 쉽고 익숙함
- 높은 활용도 ⇒ APP.js 에서 만든 component를 index.js에서 <App />이런 식으로 활용

### JSX 문법

1. 컴포넌트에 여러 요소가 있으면 반드시 부모 요소 하나로 감싸야한다. (vue컴포넌트에서 template부분에서 div가 항상 상위 태그인 것 처럼)

```jsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>허허허 잘 되나요?</h1>
      </header>
    </div>
  );
}
export default App;
```

2. 자바스크립트 표현을 사용할 때는 중괄호 { }로 감싸기

```jsx
function App() {
  const name = '리엑트';
  return (
    <div className="App">
      <header className="App-header">
        <h1>허허허 {name}가 잘 되나요?</h1>
      </header>
    </div>
  );
}

export default App;
```

3. IF문 대신 조건부 연산자(삼항 연산자) 사용

JSX 내부에서는 IF문을 사용할 수 없다. 조건에 따라 다른 내용 렌더링 할 때는 JSX 밖에서 조건을 설정하거나, { }안에 조건부 연산자(삼항 연산자)

```jsx
function App() {
  const name = '리액트';
  return (
    <div className="App">
      <header className="App-header">
        { name === '리액트' ? (
          <h1>허허허 {name}가 잘 됩니다.</h1>
        ) : ( 
          <h1>헉 리액트가 아닙니다.</h1>
        )}
      </header>
    </div>
  );
}
```

```jsx
function App() {
  const name = '리액트아니지롱';
  return (
    <div className="App">
      <header className="App-header">
        { name === '리액트' ? (
          <h1>허허허 {name}가 잘 됩니다.</h1>
        ) : ( 
          <h1>헉 리액트가 아닙니다.</h1>
        )}
      </header>
    </div>
  );
}
```

2. AND연산자(&&)를 사용한 조건부 렌더링
   
   ```jsx
   function App() {
    const name = '리액트';
    return (
      <div className="App">
        <header className="App-header">
          {name === '리액트' && <h1>리액트 입니다.</h1>}
        </header>
      </div>
    );
   }
   ```
   
   이 방법은 name이 리액트가 아닐 때 null값을 가지므로 아무것도 나타나지 않는다. 하지만 falsy한 값인 0은 예외적으로 0으로 페이지에 나타난다.

3. undefined를 렌더링하지 안기
   
   undefined값을 반환하면 오류가 발생한다. 따라서 어떤값이 undefined일 수도 있다면, OR( || )연산자를 사용해 undefined값일 때 반환할 값을 설정해 주어야한다. ⇒ return 되는 값이 undefined면 안됨
   
   ```jsx
   // 오류 남
   function App() {
    const name = undefined;
    return name;
   }
   
   // 가능
   function App() {
    const name = undefined;
    return name || '값이 undefined 됨';
   }
   ```
   
   하지만 JSX 내부에서는 undefined값을 렌더링 하는 것은 오류는 나지 않는다.
   
   ```jsx
   function App() {
    const name = undefined;
    return (
      <div className="App">
        <header className="App-header">
          {name || '값이 undefined입니다.'} 
        </header>
      </div>
    );
   }
   ```

4. 인라인 스타일링
   
   인라인 스타일링 사용시 카멜표기법을 사용해야한다.
   
   ```jsx
   function App() {
    const name = undefined;
    const style = {
      // background-color 는 backgroundColor으로 사용
      backgroundColor: 'white',
      color: 'black'
    }
    return (
      <div className="App">
        <header className="App-header" style={style}>
          {name || '값이 undefined입니다.'} 
        </header>
      </div>
    );
   }
   ```
   
   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dd5cdff-4533-4126-9e85-d15be992212e/Untitled.png)

5. class 대신 className사용
   
   CSS에서 사용하듯이 <div class=’이름’> 식으로 사용 가능하지만, console창에 오류가 난다. 따라서 <div className=’이름’>으로 사용해야한다.

6. 꼭 닫아야 하는 태그
   
   HTML에서 <input>은 닫는 태그가 없더라도 작동한다. 하지만 JSX에서는 <input></input> 처럼 닫지 않으면 오류가 발생한다.
   
   하지만 특별한 내용이 들어가지 않는 경우 <input/>하나만 작성해도 된다.

7. 주석
   
   { /* 주석내용 */} 을 사용해야한다. 자바스크립트처럼 //를 그대로 사용하게되면 주석으로 처리하지 못하고 그대로 //의 내용을 반환한다.