---
title: ""
excerpt: ""
layout: single
author_profile: false
share: false
header:
  image: /assets/images/LR_9_0.png
  teaser: /assets/images/LR_9_0.png
sidebar:
  - title: "Project Type"
    text: "Personal"
number: 0
toc: false
classes: wide
---
# Linear Regression

Linear regression is one of the simplest and most co\thetamonly used algorithms for predicting a continuous output variable.



```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from IPython.display import clear_output
import time
%matplotlib inline
```

## Univariate

In its simplest form, linear regression models the relationship between two variables by fitting a straight line to the observed data. The line can be expressed as:

$$ y = \theta_0 + \theta_1x  $$

Where:
- $$ y $$ is the dependent variable (the variable we want to predict).
- $$ x $$ is the independent variable (the input variable).
- $$\theta_1$$ is the slope of the line (how much $$ y $$ changes with $$ x $$).
- $$\theta_0$$ is the intercept (the value of $$ y $$ when $$ x = 0 $$).

### Assumptions
- There is a linear relationship between the dependent and independent variables.
- Errors (the differences between observed and predicted values) are normally distributed.



```python
N=50
 
x = np.random.randn(N)
e = np.random.randn(N) * 5
 
b0 = 32 
b1 = 9 
y = b0 + b1 * x + e
plt.scatter(x=x,y=y)
```




    <matplotlib.collections.PathCollection at 0x10d7e9e50>




    
![png](/assets/images/LR_3_1.png)
    


### Cost Function and Least Squares

We can do by  minimizing the loss function between the predicted values and the actual values. MUsually the best loss functions are **RSS** and **MSE**

Defined $$ \hat{y}_i = (\hat{\theta_1}x_i + \hat{\theta_0}) $$

#### RSS
$$
J(\theta_1, \theta_0) =  \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

#### MSE

$$
J(\theta_1, \theta_0) = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

Where:
- $$ J(\theta_1, \theta_0) $$ is the cost function to minimize.
- $$ n $$ is the number of data points.
- $$ y_i $$ is the actual value of the dependent variable for the $$ i^{th} $$ data point.
- $$ x_i $$ is the value of the independent variable for the $$ i^{th} $$ data point.
- $$ \theta_1x_i +\theta_0$$ is the predicted value of $$ y $$ for the $$ i^{th} $$ data point.

The objective of linear regression is to find the values of $$\theta_1$$ (slope) and $$\theta_0$$ (intercept) that minimize this cost function. This tipically can be done with 2 approach:
1. Analytic approach
2. Gradient Descent


## Analytic approach 

First rewrite the loss function of MSE as:

$$
J(\hat{\theta}_0, \hat{\theta}_1) = \sum_{i=1}^{n} \left( y_i - \left( \hat{\theta}_0 + \hat{\theta}_1 x_i \right) \right)^2
$$

<!-- $$
\frac{\partial\ J(\hat{\theta}_0, \hat{\theta}_1)}{\partial \hat{\theta}_0} = %-2 \sum_{i=1}^{n} \left( y_i - \hat{\theta}_0 - \hat{\theta}_1 x_i \right)
$$ -->

To find the estimate of $$ \hat{\theta}_0 $$, we need to take the derivative of the cost function $$ J(\hat{\theta}_0, \hat{\theta}_1) $$ with respect to $$ \hat{\theta}_0 $$.

We start with:

$$
\begin{aligned}
\frac{\partial}{\partial \hat{\theta}_0} J(\hat{\theta}_0, \hat{\theta}_1) &= \frac{\partial}{\partial \hat{\theta}_0} \left( \sum_{i=1}^{n} \left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right)^2 \right) \\ 
&=
\sum_{i=1}^{n}{2 \cdot \left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right) \cdot \frac{\partial}{\partial \hat{\theta}_0} \left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right)} \\
&=
-2 \sum_{i=1}^{n}{\left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right)}
\end{aligned}
$$


Now we can rewrite the derivative as:

$$
\frac{\partial}{\partial \hat{\theta}_0} J(\hat{\theta}_0, \hat{\theta}_1) = -2 \sum_{i=1}^{n} \left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right)
$$

Since we want to minimize the error, we set the derivative equal to 0:

$$
-2 \sum_{i=1}^{n} \left( y_i - (\hat{\theta}_0 + \hat{\theta}_1 x_i) \right) = 0
$$

Expanding this expression:

$$
\sum_{i=1}^{n} y_i - N \hat{\theta}_0 - \hat{\theta}_1 \sum_{i=1}^{n} x_i = 0
$$

Now, solve for $$ \hat{\theta}_0 $$:

$$
\hat{\theta}_0 = \bar{y} - \hat{\theta}_1 \bar{x}
$$


This gives our intercept estimate, $$ \hat{\theta}_0 $$, in terms of the slope estimate, $$ \hat{\theta}_1 $$. 

--- 
To find the slope estimate, again start by taking the derivative of the RSS:

$$
\frac{\partial J(\hat{\theta}_0, \hat{\theta}_1)}{\partial \hat{\theta}_1} = - 2 \sum_{i=1}^{n} \left( y_i - \hat{\theta}_0 - \hat{\theta}_1 x_i \right) x_i
$$

Setting this equal to 0 and substituting for $$ \hat{\theta}_0 $$ we get

$$
-2 \sum_{i=1}^{n} \left( y_i - \left( \bar{y} - \hat{\theta}_1 \bar{x} \right) - \hat{\theta}_1 x_i \right) x_i = 0
$$

$$
\hat{\theta}_1 \sum_{i=1}^{n} \left( x_i - \bar{x} \right) x_i = \sum_{i=1}^{n} \left( y_i - \bar{y} \right) x_i \\
\hat{\theta}_1  =\frac{\sum_{i=1}^{n} \left( y_i - \bar{y} \right) x_i}{\sum_{i=1}^{n} \left( x_i - \bar{x} \right) x_i}
$$


Since 
$$
\sum_{i=1}^{n}c(z_i -\bar{z}) = 0 
$$
for any costant $$c$$ and collection $$z=z_1,...,z_i$$ with $$\bar{z}$$ mean of $$z$$, and since $$ \bar{x} $$ is a costant, we can subtract as follow:

$$
\hat{\theta}_1  =\frac{\sum_{i=1}^{n} \left( y_i - \bar{y} \right) x_i - \bar{x}( y_i - \bar{y}) }{\sum_{i=1}^{n} \left( x_i - \bar{x} \right) x_i - \bar{x}(x_i - \bar{x}) }
$$

Finally, the slope estimate is:

$$
\hat{\theta}_1 = \frac{\sum_{i=1}^{n} \left( x_i - \bar{x} \right) \left( y_i - \bar{y} \right)}{\sum_{i=1}^{n} \left( x_i - \bar{x} \right)^2}
$$

```python

b1cap = np.sum((x - np.mean(x))*(y - np.mean(y))) / np.sum((x - np.mean(x))**2)
b0cap = np.mean(y) - b1cap*np.mean(x)

x_true = np.linspace(min(x), max(x), 100)

y_true = b0 + b1 * x_true
y_cap = b0cap + b1cap * x_true

plt.scatter(x=x,y=y)

plt.plot(x_true,y_cap,color="red")
plt.plot(x_true,y_true,color="green")
plt.xlabel('X')
plt.ylabel('y')
plt.legend(["data","predicted","real"])


```




    <matplotlib.legend.Legend at 0x10d9cbd90>

    
![png](/assets/images/LR_6_1.png)


### Multivariate

Starting from 
$$
\hat{y} = \hat{\theta}^\intercal x
$$

Where:
- $$ y $$ is the dependent variable.
- $$ x = 1,x_1, x_2, \ldots, x_p $$ are the independent variables (features).
- $$ \theta = \theta_0, \theta_1, \ldots, \theta_p $$ are the parameters to be estimated (weights or coefficients).

We need to get the multivariate form:
$$
y = \begin{bmatrix}
       y_0  \\ 
       y_1  \\ 
       ...  \\
       y_n  
     \end{bmatrix}
,
X = \begin{bmatrix}
       1    \\ 
       x_1^\intercal  \\
       ...  \\
       x_n^\intercal  
     \end{bmatrix}
.
$$
and then obtain

$$
\hat{y} = \textbf{X}\hat{\theta}
$$

rewrite our loss function
$$
J(\hat{\theta}) = \sum_{i=1}^{p} \left( y^{(i)} - \hat{y}^{(i)} \right)^2
$$

as

$$
J(\hat{\theta}) = (y - X\hat{\theta})^\intercal(y - X\hat{\theta})
$$

and expand

$$
\begin{aligned}
J(\hat{\theta}) &= (y^\intercal - (X\hat{\theta})^\intercal)(y - X\hat{\theta}) \\
&= y^\intercal y - y^\intercal(X\hat{\theta}) - (X\hat{\theta})^\intercal y - (X\hat{\theta})^\intercal(X\hat{\theta})\\
&= y^\intercal y -2 (X\hat{\theta})^\intercal y -\hat{\theta}^\intercal X^\intercal X\hat{\theta}
\end{aligned}
$$

now, minimize using the proprierties $$ \frac{\partial}{\partial \theta}(\theta^\intercal A \theta) = A \theta + A^\intercal \theta$$ and where $$A$$=$$X^\intercal X$$ is symmetrical

$$
\frac{\partial J(\theta)}{\partial \theta} = -2 X^\intercal y + 2 X^\intercal X\theta
$$

setting to 0

$$
\begin{aligned}
-2 X^\intercal Y + 2 X^\intercal X\theta &= 0 \\
X^\intercal X\theta &= X^\intercal y \\
\theta &= (X^\intercal X)^{-1}X^\intercal y
\end{aligned}
$$


## Gradient Descent

Gradient descent is an optimization algorithm used to find the minimum of the cost function. It works by iteratively adjusting the parameters $$\theta_1$$ and $$\theta_0$$ in the direction that reduces the cost function.

The update rules for gradient descent are:

$$
\theta_1 =\theta_1- \alpha \frac{\partial J(\theta_1, \theta_0)}{\partial \theta_1}
$$
$$
\theta_0 =\theta_0- \alpha \frac{\partial J(\theta_1, \theta_0)}{\partial \theta_0}
$$

Where:
- $$ \alpha $$ is the learning rate, which controls the step size of the updates.
- $$ \frac{\partial J(\theta_1, \theta_0)}{\partial \theta_1} $$ and $$ \frac{\partial J(\theta_1, \theta_0)}{\partial \theta_0} $$ are the partial derivatives of the cost function with respect to $$\theta_1$$ and $$\theta_0$$, respectively.

The partial derivatives are calculated as follows:

$$
\frac{\partial J(\theta_1, \theta_0)}{\partial \theta_1} = -\frac{2}{n} \sum_{i=1}^{n} x_i (y_i - (\theta_1x_i + \theta_0))
$$
$$
\frac{\partial J(\theta_1, \theta_0)}{\partial \theta_0} = -\frac{2}{n} \sum_{i=1}^{n} (y_i - (\theta_1x_i + \theta_0))
$$

These derivatives represent the gradient (or slope) of the cost function in the direction of $$\theta_1$$ and $$\theta_0$$. By updating $$\theta_1$$ and $$\theta_0$$ using these derivatives, we can minimize the cost function and find the optimal parameters for the regression line.


```python
b0cap=1
b1cap=1
learningRate=0.005

for i in range(1000):
    b1cap -= learningRate * -(2/N) * np.sum(x_true * (y_true - (b1cap * x_true + b0cap)))  
    b0cap -= learningRate * -(2/N) * np.sum(y_true - (b1cap * x_true + b0cap)) 
    
    if i % 100 == 0:
        cost = (1/N) * np.sum(((b1cap * x_true + b0cap) - y_true)**2)
        print(f"Iteration {i}: Cost = {cost}, b1 = {b1cap}, b0 = {b0cap}")
        y_cap = y_cap = b0cap + b1cap * x_true
        clear_output(wait=True)
        plt.scatter(x=x,y=y)
        plt.plot(x_true,y_cap,color="red")
        plt.plot(x_true,y_true,color="green")
        plt.xlabel('X')
        plt.ylabel('y')
        plt.legend(["data","predicted","real"])
        plt.title(f'Iteration {i} - MSE: {cost:.15f}')
        plt.grid(True)
        plt.show() 
        time.sleep(0.5)

```


    
![png](/assets/images/LR_9_0.png)
    


### Multivariate GD

When there are multiple independent variables, the model is called **multivariate linear regression**. The equation becomes:

$$
y = \theta^\intercal x                                             
$$

Where:
- $$ y $$ is the dependent variable.
- $$ x = 1,x_1, x_2, \ldots, x_p $$ are the independent variables (features).
- $$ \theta = \theta_0, \theta_1, \ldots, \theta_p $$ are the parameters to be estimated (weights or coefficients).

The cost function is similar but generalized for multiple variables (the $$\frac{1}{2}$$ is usually included for further simplification when the derivative is applied):

Defined $$ \hat{y} = \hat{\theta}^\intercal x $$

$$
J(\hat{\theta}) = \frac{1}{2n} \sum_{i=1}^{n} (\hat{y}^{(i)} - y^{(i)})^2
$$

Where:
- $$ \hat{y}^{(i)} $$ is the hypothesis function (prediction) for the $$ i^{th} $$ data point.
- $$ y^{(i)} $$ is the actual value of the dependent variable for the $$ i^{th} $$ data point.

The gradient descent update rules become:

$$
\theta_j = \theta_j - \alpha \frac{1}{n} \sum_{i=1}^{n} (\hat{y}^{(i)} - y^{(i)}) x_j^{(i)}
$$
