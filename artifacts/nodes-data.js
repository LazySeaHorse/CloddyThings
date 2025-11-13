// ============================================
// STATISTICS MIND MAP - NODE DATA
// ============================================

// Helper function to create a node easily
function createNode(id, label, category, pos, content) {
    return {
        id,
        label,
        category,
        x: pos[0],
        y: pos[1],
        content: {
            title: content.title,
            explanation: content.explanation,
            formulas: content.formulas || [],
            symbols: content.symbols || [],
            connections: content.connections || []
        }
    };
}

// Helper for formulas
function formula(latex, description) {
    return { latex, description };
}

// ============================================
// COMPLETE NODE DATA (Original + New)
// ============================================

const nodes = [
    // ========== FOUNDATION LAYER ==========
    createNode('data', 'Data/Observations', 'foundation', [1500, 100], {
        title: 'Data/Observations',
        explanation: 'The starting point of all statistics. These are the actual measurements or observations you collect.',
        formulas: [
            formula('x_1, x_2, x_3, \\ldots, x_n', 'Individual data points')
        ],
        symbols: ['x = individual value', 'n = number of observations (sample size)', 'N = population size'],
        connections: ['count', 'sum']
    }),

    createNode('count', 'Count (n)', 'foundation', [1200, 250], {
        title: 'Count (Sample Size)',
        explanation: 'How many observations you have. This is fundamental to almost every statistical calculation.',
        formulas: [
            formula('n = \\text{number of data points}', 'Simply count your observations')
        ],
        symbols: ['n = sample size', 'N = population size'],
        connections: ['mean', 'df', 'se']
    }),

    createNode('sum', 'Sum (Σ)', 'foundation', [1800, 250], {
        title: 'Sum (Σ)',
        explanation: 'Add up all your values. The Greek letter Sigma (Σ) means "add them all up".',
        formulas: [
            formula('\\sum x = x_1 + x_2 + x_3 + \\cdots + x_n', 'Add all values together')
        ],
        symbols: ['Σ = summation (add them all)', 'x = individual values'],
        connections: ['mean']
    }),

    // ========== DESCRIPTIVE STATISTICS ==========
    createNode('mean', 'Mean (x̄)', 'descriptive', [1500, 400], {
        title: 'Mean (Average)',
        explanation: 'The center point of your data. Add everything up and divide by how many you have.',
        formulas: [
            formula('\\bar{x} = \\frac{\\sum x}{n}', 'Sample mean'),
            formula('\\mu = \\frac{\\sum x}{N}', 'Population mean')
        ],
        symbols: ['x̄ (x-bar) = sample mean', 'μ (mu) = population mean', 'Σx = sum of all values', 'n = sample size'],
        connections: ['deviation', 'se', 'ttest']
    }),

    createNode('deviation', 'Deviation', 'descriptive', [1300, 550], {
        title: 'Deviation from Mean',
        explanation: 'How far each data point is from the average. Can be positive (above mean) or negative (below mean).',
        formulas: [
            formula('x - \\bar{x}', 'Distance from mean for each point')
        ],
        symbols: ['x = individual value', 'x̄ = mean'],
        connections: ['ss', 'zscore']
    }),

    createNode('ss', 'Sum of Squares', 'descriptive', [1100, 700], {
        title: 'Sum of Squares (SS)',
        explanation: 'Add up all the squared deviations. We square them so positive and negative deviations don\'t cancel out, and to emphasize larger differences.',
        formulas: [
            formula('SS = \\sum(x - \\bar{x})^2', 'Total sum of squared deviations')
        ],
        symbols: ['Σ = sum of', 'x = individual values', 'x̄ = mean', '² = squared'],
        connections: ['variance', 'ssb', 'ssw']
    }),

    createNode('variance', 'Variance (s²)', 'descriptive', [900, 850], {
        title: 'Variance',
        explanation: 'Average squared deviation. Tells you how spread out your data is. We use (n-1) for samples to get an unbiased estimate.',
        formulas: [
            formula('s^2 = \\frac{\\sum(x - \\bar{x})^2}{n-1}', 'Sample variance'),
            formula('\\sigma^2 = \\frac{\\sum(x - \\mu)^2}{N}', 'Population variance')
        ],
        symbols: ['s² = sample variance', 'σ² (sigma squared) = population variance', 'n-1 = degrees of freedom for sample'],
        connections: ['sd', 'pooled', 'ftest']
    }),

    createNode('sd', 'Standard Deviation', 'descriptive', [1100, 1000], {
        title: 'Standard Deviation (SD)',
        explanation: 'The square root of variance. Tells you the typical distance from the mean, in the same units as your original data.',
        formulas: [
            formula('s = \\sqrt{s^2}', 'Sample standard deviation'),
            formula('\\sigma = \\sqrt{\\sigma^2}', 'Population standard deviation')
        ],
        symbols: ['s = sample SD', 'σ (sigma) = population SD', '√ = square root'],
        connections: ['se', 'zscore', 'ttest']
    }),

    createNode('covariance', 'Covariance', 'descriptive', [1700, 700], {
        title: 'Covariance',
        explanation: 'Measures how two variables move together. Positive means they increase together, negative means they move opposite.',
        formulas: [
            formula('\\text{cov}(x,y) = \\frac{\\sum(x - \\bar{x})(y - \\bar{y})}{n-1}', 'How x and y vary together')
        ],
        symbols: ['x, y = two variables', 'x̄, ȳ = means of x and y', 'n-1 = degrees of freedom'],
        connections: ['correlation']
    }),

    createNode('correlation', 'Correlation (r)', 'relationship', [2000, 850], {
        title: 'Correlation Coefficient',
        explanation: 'Standardized measure of how two variables are related. Always between -1 and +1. 0 means no linear relationship.',
        formulas: [
            formula('r = \\frac{\\text{cov}(x,y)}{s_x \\cdot s_y}', 'Pearson correlation'),
            formula('r = \\frac{\\sum(x - \\bar{x})(y - \\bar{y})}{\\sqrt{\\sum(x - \\bar{x})^2 \\sum(y - \\bar{y})^2}}= \\frac{n(ΣXY) - (ΣX)(ΣY)}{\\sqrt{[n(ΣX²) - (ΣX)²][n(ΣY²) - (ΣY)²]}}', 'Alternative formula')
        ],
        symbols: ['r = correlation coefficient', 's_x, s_y = standard deviations of x and y', '-1 ≤ r ≤ +1'],
        connections: ['regression']
    }),

    // ========== DISTRIBUTIONS ==========
    createNode('df', 'Degrees of Freedom', 'distribution', [700, 550], {
        title: 'Degrees of Freedom (df)',
        explanation: 'The number of independent pieces of information. When you estimate the mean, you "use up" one degree of freedom, leaving n-1.',
        formulas: [
            formula('df = n - 1', 'One sample'),
            formula('df = n_1 + n_2 - 2', 'Two independent samples'),
            formula('df = (r-1)(c-1)', 'Chi-square independence')
        ],
        symbols: ['df = degrees of freedom', 'n = sample size', 'Number of values free to vary'],
        connections: ['ttest', 'chisq', 'anova']
    }),

    createNode('se', 'Standard Error', 'distribution', [1300, 850], {
        title: 'Standard Error (SE)',
        explanation: 'How much your sample mean would vary if you took many samples. Gets smaller with larger sample sizes.',
        formulas: [
            formula('SE = \\frac{s}{\\sqrt{n}}', 'Standard error of the mean'),
            formula('SE = \\frac{\\sigma}{\\sqrt{n}}', 'When population SD is known')
        ],
        symbols: ['SE = standard error', 's = sample standard deviation', 'σ = population SD', 'n = sample size'],
        connections: ['ci', 'ttest', 'ztest']
    }),

    createNode('zscore', 'Z-score', 'distribution', [900, 550], {
        title: 'Z-score (Standard Score)',
        explanation: 'How many standard deviations away from the mean. Converts any value to a standard scale.',
        formulas: [
            formula('z = \\frac{x - \\mu}{\\sigma}', 'For individual values'),
            formula('z = \\frac{\\bar{x} - \\mu}{\\sigma/\\sqrt{n}}', 'For sample means')
        ],
        symbols: ['z = standard score', 'x = value', 'μ = population mean', 'σ = population SD'],
        connections: ['ztest', 'normal']
    }),

    createNode('normal', 'Normal Distribution', 'distribution', [700, 400], {
        title: 'Normal Distribution',
        explanation: 'The bell curve. Many statistics assume this shape. Fully described by mean and standard deviation.',
        formulas: [
            formula('68\\% \\text{ within } \\mu \\pm 1\\sigma', 'About 68% of data within 1 SD of mean'),
            formula('95\\% \\text{ within } \\mu \\pm 2\\sigma', 'About 95% of data within 2 SD of mean')
        ],
        symbols: ['Symmetric bell-shaped curve', 'Mean = Median = Mode', 'Defined by μ and σ'],
        connections: ['ztest', 'ci']
    }),

    createNode('tdist', 't Distribution', 'distribution', [500, 850], {
        title: 't Distribution',
        explanation: 'Like the normal distribution but with fatter tails. Used when we don\'t know the population SD. Approaches normal as sample size increases.',
        formulas: [
            formula('t = \\frac{\\bar{x} - \\mu}{s/\\sqrt{n}}', 't-statistic')
        ],
        symbols: ['t = t-statistic', 'df = degrees of freedom', 'Fatter tails when df is small'],
        connections: ['ttest', 'ci']
    }),

    createNode('chisqdist', 'χ² Distribution', 'distribution', [500, 1200], {
        title: 'Chi-square Distribution',
        explanation: 'Distribution of sum of squared z-scores. Always positive, right-skewed. Shape depends on degrees of freedom.',
        formulas: [
            formula('\\chi^2 = \\sum z^2', 'Sum of squared standard scores'),
            formula('\\chi^2 = \\frac{(n-1)s^2}{\\sigma^2}', 'For variance')
        ],
        symbols: ['χ² (chi-square)', 'Always ≥ 0', 'Shape depends on df'],
        connections: ['chisq', 'fdist']
    }),

    createNode('fdist', 'F Distribution', 'distribution', [500, 1000], {
        title: 'F Distribution',
        explanation: 'Ratio of two chi-square distributions (or two variances). Always positive. Used in ANOVA and F-tests.',
        formulas: [
            formula('F = \\frac{\\text{variance}_1}{\\text{variance}_2}', 'Ratio of variances'),
            formula('F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}', 'In ANOVA')
        ],
        symbols: ['F = F-statistic', 'Has two df: numerator and denominator', 'Always ≥ 0'],
        connections: ['ftest', 'anova']
    }),

    // ========== INFERENCE ==========
    createNode('hypothesis', 'Hypothesis Testing', 'inference', [1500, 1150], {
        title: 'Hypothesis Testing',
        explanation: 'A decision-making framework. We start assuming nothing special (null hypothesis), then see if our data provides enough evidence to reject that.',
        formulas: [
            formula('H_0: \\text{null hypothesis (no effect)}', 'What we assume is true'),
            formula('H_1: \\text{alternative hypothesis}', 'What we\'re testing for'),
            formula('p\\text{-value} < \\alpha \\implies \\text{reject } H_0', 'Decision rule (α usually 0.05)')
        ],
        symbols: ['H₀ = null hypothesis', 'H₁ = alternative hypothesis', 'p-value = probability of data if H₀ true', 'α = significance level (0.05)'],
        connections: ['ttest', 'ztest', 'chisq', 'anova']
    }),

    createNode('ci', 'Confidence Interval', 'inference', [1300, 1150], {
        title: 'Confidence Interval',
        explanation: 'A range of plausible values for the true parameter. A 95% CI means if we repeated this many times, 95% of intervals would contain the true value.',
        formulas: [
            formula('\\bar{x} \\pm (t \\times SE)', '95% CI for mean (t-based)'),
            formula('\\bar{x} \\pm 1.96 \\times \\frac{s}{\\sqrt{n}}', '95% CI (z=1.96 for 95%)')
        ],
        symbols: ['x̄ = sample mean', 'SE = standard error', 't or z = critical value', '± = plus or minus'],
        connections: ['se', 'ttest']
    }),

    // ========== TESTS FOR MEANS ==========
    createNode('ztest', 'Z-test', 'means-test', [900, 400], {
        title: 'Z-test',
        explanation: 'Test for the mean when you know the population standard deviation (rare in practice).',
        formulas: [
            formula('z = \\frac{\\bar{x} - \\mu_0}{\\sigma/\\sqrt{n}}', 'One-sample z-test')
        ],
        symbols: ['x̄ = sample mean', 'μ₀ = hypothesized mean', 'σ = known population SD', 'n = sample size'],
        connections: ['normal', 'hypothesis']
    }),

    createNode('ttest', 't-tests', 'means-test', [700, 700], {
        title: 't-tests (Overview)',
        explanation: 'Tests for means when you don\'t know the population SD. Three types: one-sample, independent, and paired.',
        formulas: [
            formula('t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}', 'One-sample'),
            formula('t = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE_{\\text{diff}}}', 'Independent'),
            formula('t = \\frac{\\bar{d}}{s_d/\\sqrt{n}}', 'Paired')
        ],
        symbols: ['t = t-statistic', 's = sample SD', 'd̄ = mean of differences'],
        connections: ['ttest1', 'ttest2', 'ttestpaired']
    }),

    createNode('ttest1', 'One-Sample t-test', 'means-test', [500, 550], {
        title: 'One-Sample t-test',
        explanation: 'Tests if your sample mean is different from a specific value.',
        formulas: [
            formula('t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}', 't-statistic'),
            formula('df = n - 1', 'Degrees of freedom')
        ],
        symbols: ['x̄ = sample mean', 'μ₀ = value to test against', 's = sample SD', 'n = sample size'],
        connections: ['tdist', 'hypothesis', 'se']
    }),

    createNode('ttest2', 'Independent t-test', 'means-test', [300, 700], {
        title: 'Independent t-test',
        explanation: 'Compares means of two separate groups.',
        formulas: [
            formula('t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{s^2_p \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}}', 't-statistic'),
            formula('df = n_1 + n_2 - 2', 'Degrees of freedom')
        ],
        symbols: ['x̄₁, x̄₂ = means of groups', 's²_p = pooled variance', 'n₁, n₂ = sample sizes'],
        connections: ['pooled', 'tdist', 'hypothesis']
    }),

    createNode('ttestpaired', 'Paired t-test', 'means-test', [300, 550], {
        title: 'Paired t-test',
        explanation: 'Compares paired measurements on the same subjects.',
        formulas: [
            formula('d = x_1 - x_2', 'Difference for each pair'),
            formula('t = \\frac{\\bar{d}}{s_d/\\sqrt{n}}', 't-statistic')
        ],
        symbols: ['d = difference for each pair', 'd̄ = mean of differences', 's_d = SD of differences'],
        connections: ['tdist', 'hypothesis']
    }),

    createNode('pooled', 'Pooled Variance', 'variance-related', [300, 850], {
        title: 'Pooled Variance',
        explanation: 'Combines variance estimates from two groups, assuming equal variances.',
        formulas: [
            formula('s^2_p = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}', 'Pooled variance')
        ],
        symbols: ['s²_p = pooled variance', 's₁², s₂² = group variances', 'Weighted average'],
        connections: ['ttest2', 'variance']
    }),

    // ========== CATEGORICAL TESTS ==========
    createNode('chisq', 'Chi-square Tests', 'categorical-test', [700, 1350], {
        title: 'Chi-square Tests',
        explanation: 'Tests for categorical data. Compares observed vs expected frequencies.',
        formulas: [
            formula('\\chi^2 = \\sum \\frac{(O - E)^2}{E}', 'Basic chi-square formula')
        ],
        symbols: ['χ² = chi-square statistic', 'O = observed frequency', 'E = expected frequency'],
        connections: ['chisqgof', 'chisqind']
   }),

    createNode('chisqgof', 'Goodness of Fit', 'categorical-test', [500, 1450], {
        title: 'Chi-square Goodness of Fit',
        explanation: 'Tests if observed frequencies match an expected distribution.',
        formulas: [
            formula('\\chi^2 = \\sum \\frac{(O - E)^2}{E}', 'Sum over categories'),
            formula('df = k - 1 - p', 'k=categories, p=parameters')
        ],
        symbols: ['O = observed count', 'E = expected count', 'k = number of categories'],
        connections: ['chisqdist', 'hypothesis']
    }),

    createNode('chisqind', 'Test of Independence', 'categorical-test', [900, 1450], {
        title: 'Chi-square Test of Independence',
        explanation: 'Tests if two categorical variables are related.',
        formulas: [
            formula('\\chi^2 = \\sum\\sum \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}', 'Sum over all cells'),
            formula('E_{ij} = \\frac{\\text{row}_i \\times \\text{col}_j}{\\text{total}}', 'Expected frequency'),
            formula('df = (r-1)(c-1)', 'r=rows, c=columns')
        ],
        symbols: ['O_ij = observed in cell (i,j)', 'E_ij = expected in cell (i,j)'],
        connections: ['chisqdist', 'hypothesis']
    }),

    createNode('chinormal', 'χ² Normal Approx', 'categorical-test', [700, 1500], {
        title: 'Chi-square Normal Approximation',
        explanation: 'When df is large (>30), chi-square approximates normal distribution.',
        formulas: [
            formula('\\chi^2 \\approx N(\\mu=df, \\sigma^2=2df)', 'Large df approximation')
        ],
        symbols: ['Mean of χ² = df', 'Variance of χ² = 2×df'],
        connections: ['chisqdist', 'normal']
    }),

    // ========== ANOVA ==========
    createNode('anova', 'ANOVA', 'anova-test', [1100, 1350], {
        title: 'Analysis of Variance',
        explanation: 'Compares means of 3+ groups by analyzing variance.',
        formulas: [
            formula('F = \\frac{MS_{\\text{between}}}{MS_{\\text{within}}}', 'F-statistic'),
            formula('H_0: \\mu_1 = \\mu_2 = \\mu_3 = \\cdots', 'All means equal')
        ],
        symbols: ['F = F-statistic', 'MS = mean square', 'Between/within group variation'],
        connections: ['anova1', 'anova2', 'ssb', 'ssw']
    }),

    createNode('ssb', 'SS Between', 'anova-test', [1300, 1500], {
        title: 'Sum of Squares Between Groups',
        explanation: 'Measures how group means differ from overall mean.',
        formulas: [
            formula('SS_B = \\sum n_j(\\bar{x}_j - \\bar{x}_{\\text{grand}})^2', 'Between-group variation')
        ],
        symbols: ['n_j = group size', 'x̄_j = group mean', 'x̄_grand = overall mean'],
        connections: ['msb', 'anova']
    }),

    createNode('ssw', 'SS Within', 'anova-test', [900, 1500], {
        title: 'Sum of Squares Within Groups',
        explanation: 'Measures variation within each group (error).',
        formulas: [
            formula('SS_W = \\sum\\sum(x_{ij} - \\bar{x}_j)^2', 'Within-group variation')
        ],
        symbols: ['x_ij = observation i in group j', 'x̄_j = group mean'],
        connections: ['msw', 'anova']
    }),

    createNode('msb', 'MS Between', 'anova-test', [1300, 1650], {
        title: 'Mean Square Between',
        explanation: 'Average between-group variation per df.',
        formulas: [
            formula('MS_B = \\frac{SS_B}{df_{\\text{between}}}', 'MSB calculation'),
            formula('df_{\\text{between}} = k - 1', 'k = number of groups')
        ],
        symbols: ['MS_B = mean square between', 'k = groups'],
        connections: ['ssb', 'ftest', 'anova1']
    }),

    createNode('msw', 'MS Within', 'anova-test', [900, 1650], {
        title: 'Mean Square Within',
        explanation: 'Average within-group variation per df (error variance).',
        formulas: [
            formula('MS_W = \\frac{SS_W}{df_{\\text{within}}}', 'MSW calculation'),
            formula('df_{\\text{within}} = N - k', 'N=total, k=groups')
        ],
        symbols: ['MS_W = mean square within', 'Also called MS_error'],
        connections: ['ssw', 'ftest', 'anova1']
    }),

    createNode('anova1', 'One-way ANOVA', 'anova-test', [1100, 1500], {
        title: 'One-way ANOVA',
        explanation: 'Compares means across groups differing on one factor.',
        formulas: [
            formula('F = \\frac{MS_B}{MS_W}', 'F-statistic'),
            formula('df_1 = k-1, df_2 = N-k', 'Degrees of freedom')
        ],
        symbols: ['k = number of groups', 'N = total sample size'],
        connections: ['fdist', 'hypothesis', 'msb', 'msw']
    }),

    createNode('anova2', 'Two-way ANOVA', 'anova-test', [1300, 1350], {
        title: 'Two-way ANOVA',
        explanation: 'Analyzes effects of two factors plus interaction.',
        formulas: [
            formula('F_A = \\frac{MS_A}{MS_{\\text{error}}}', 'F for factor A'),
            formula('F_B = \\frac{MS_B}{MS_{\\text{error}}}', 'F for factor B'),
            formula('F_{AB} = \\frac{MS_{AB}}{MS_{\\text{error}}}', 'F for interaction')
        ],
        symbols: ['Three tests: A, B, and interaction'],
        connections: ['fdist', 'hypothesis', 'anova']
    }),

    createNode('ftest', 'F-test', 'variance-related', [700, 1150], {
        title: 'F-test for Variances',
        explanation: 'Tests if two variances are equal.',
        formulas: [
            formula('F = \\frac{s_1^2}{s_2^2}', 'Ratio of variances'),
            formula('df_1 = n_1-1, df_2 = n_2-1', 'Two degrees of freedom')
        ],
        symbols: ['s₁², s₂² = sample variances', 'F ≥ 1 (larger on top)'], 
        connections: ['fdist', 'variance', 'hypothesis']
    }),

    // ========== REGRESSION ==========
    createNode('regression', 'Linear Regression', 'relationship', [2200, 1000], {
        title: 'Linear Regression',
        explanation: 'Finds best-fit line to predict Y from X.',
        formulas: [
            formula('\\hat{y} = a + bx', 'Prediction equation'),
            formula('\\hat{y} = a + \\beta_1 x_1 + \\beta_2 x_2', 'Multiple regression')
        ],
        symbols: ['ŷ = predicted y', 'a = intercept', 'b/β = slope', 'x = predictor'],
        connections: ['regcoef', 'intercept', 'correlation']
    }),

    createNode('regcoef', 'Regression Coefficient', 'relationship', [2400, 850], {
        title: 'Regression Coefficient (Slope)',
        explanation: 'How much Y changes per 1-unit increase in X.',
        formulas: [
            formula('b = r \\times \\frac{s_y}{s_x}', 'Using correlation'),
            formula('b = \\frac{\\sum(x-\\bar{x})(y-\\bar{y})}{\\sum(x-\\bar{x})^2}', 'Direct calculation')
        ],
        symbols: ['b/β = slope', 'r = correlation', 's_y, s_x = standard deviations'],
        connections: ['regression', 'correlation']
    }),

    createNode('intercept', 'Intercept', 'relationship', [2400, 1150], {
        title: 'Intercept',
        explanation: 'Predicted Y when X=0. Where line crosses Y-axis.',
        formulas: [
            formula('a = \\bar{y} - b\\bar{x}', 'Intercept calculation')
        ],
        symbols: ['a = intercept', 'ȳ = mean of y', 'x̄ = mean of x', 'Line goes through (x̄,ȳ)'],
        connections: ['regression', 'mean']
    }),

    // ========== NEW: DISCRETE DISTRIBUTIONS ==========
    createNode('poisson', 'Poisson Distribution', 'discrete-dist', [2500, 200], {
        title: 'Poisson Distribution',
        explanation: 'Models the number of rare events in a fixed interval of time/space. Defined by an average rate (λ).',
        formulas: [
            formula('P(X=k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}', 'Probability Mass Function'),
            formula('E(X) = \\lambda', 'Mean'),
            formula('Var(X) = \\lambda', 'Variance (Mean = Variance)')
        ],
        symbols: ['λ (lambda) = average rate of occurrence', 'k = number of events', 'e = Euler\'s number'],
        connections: ['hypothesis', 'binpoisson']
    }),

    createNode('binomial', 'Binomial Distribution', 'discrete-dist', [2500, 400], {
        title: 'Binomial Distribution',
        explanation: 'Models the number of successes (k) in a fixed number of independent trials (n).',
        formulas: [
            formula('P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}', 'Probability Mass Function'),
            formula('E(X) = np', 'Mean'),
            formula('Var(X) = np(1 - p)', 'Variance')
        ],
        symbols: ['n = number of trials', 'k = number of successes', 'p = probability of success'],
        connections: ['bernoulli', 'binnormal', 'binpoisson', 'multinomial']
    }),

    createNode('bernoulli', 'Bernoulli Distribution', 'discrete-dist', [2700, 300], {
        title: 'Bernoulli Distribution',
        explanation: 'A single trial with two outcomes (e.g., success/failure, head/tail). Special case of Binomial where n=1.',
        formulas: [
            formula('P(X=1) = p', 'Probability of success'),
            formula('P(X=0) = 1-p', 'Probability of failure')
        ],
        symbols: ['p = probability of success'],
        connections: ['binomial']
    }),

    createNode('binnormal', 'Normal approx. to Binomial', 'distribution', [2700, 500], {
        title: 'Normal Approx. to Binomial',
        explanation: 'A Binomial(n,p) can be approximated by a Normal distribution when n is large.',
        formulas: [
            formula('X \\sim N(\\mu=np, \\sigma^2=np(1-p))', 'Approximation'),
            formula('np \\ge 10 \\text{ and } n(1-p) \\ge 10', 'Rule of thumb')
        ],
        symbols: ['Use continuity correction', 'μ = np', 'σ = sqrt(np(1-p))'],
        connections: ['binomial', 'normal']
    }),

    createNode('binpoisson', 'Poisson approx. to Binomial', 'distribution', [2700, 100], {
        title: 'Poisson Approx. to Binomial',
        explanation: 'A Binomial(n,p) can be approximated by Poisson(λ=np) when n is large and p is small.',
        formulas: [
            formula('\\lambda = np', 'Setting the rate'),
            formula('n \\ge 20 \\text{ and } p \\le 0.05', 'Rule of thumb')
        ],
        symbols: ['λ = np'],
        connections: ['binomial', 'poisson']
    }),

    createNode('geometric', 'Geometric Distribution', 'discrete-dist', [2500, 800], {
        title: 'Geometric Distribution',
        explanation: 'Models the number of trials (k) needed to get the *first* success.',
        formulas: [
            formula('P(X=k) = (1-p)^{k-1}p', 'Probability Mass Function'),
            formula('E(X) = 1/p', 'Mean (trials until 1st success)')
        ],
        symbols: ['k = trial number of 1st success', 'p = probability of success'],
        connections: ['negbinomial']
    }),

    createNode('negbinomial', 'Negative Binomial', 'discrete-dist', [2700, 900], {
        title: 'Negative Binomial Distribution',
        explanation: 'Models the number of trials (k) needed to get a fixed number of successes (r).',
        formulas: [
            formula('P(X=k) = \\binom{k-1}{r-1}p^r(1-p)^{k-r}', 'Probability Mass Function'),
            formula('E(X) = r/p', 'Mean (trials until r successes)')
        ],
        symbols: ['k = trial number of r-th success', 'r = target number of successes', 'p = probability of success'],
        connections: ['geometric']
    }),

    createNode('hypergeometric', 'Hypergeometric Dist.', 'discrete-dist', [2500, 1000], {
        title: 'Hypergeometric Distribution',
        explanation: 'Models successes in draws *without replacement* from a finite population. (Like Binomial, but probability changes).',
        formulas: [
            formula('P(X=k) = \\frac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}', 'Probability Mass Function')
        ],
        symbols: ['N = population size', 'K = successes in population', 'n = number of draws', 'k = successes in sample'],
        connections: ['binomial', 'mvhypergeometric']
    }),

    createNode('multinomial', 'Multinomial Distribution', 'discrete-dist', [2700, 1100], {
        title: 'Multinomial Distribution',
        explanation: 'Generalization of Binomial to more than 2 outcomes.',
        formulas: [
            formula('P(X_1=k_1,...) = \\frac{n!}{k_1!...k_m!}p_1^{k_1}...p_m^{k_m}', 'Probability Mass Function')
        ],
        symbols: ['n = total trials', 'm = number of categories', 'k_i = count in category i', 'p_i = probability of category i'],
        connections: ['binomial']
    }),

    createNode('mvhypergeometric', 'Multivariate Hypergeometric', 'discrete-dist', [2700, 1200], {
        title: 'Multivariate Hypergeometric',
        explanation: 'Generalization of Hypergeometric to more than 2 outcomes (sampling without replacement).',
        formulas: [
            formula('P(X_1=k_1,...) = \\frac{\\prod_{i=1}^m\\binom{K_i}{k_i}}{\\binom{N}{n}}', 'Probability Mass Function')
        ],
        symbols: ['N = population size', 'K_i = items of type i', 'n = sample size', 'k_i = items of type i in sample'],
        connections: ['hypergeometric']
    }),

    // ========== NEW: HYPOTHESIS TESTING DETAILS ==========
    createNode('pvalue', 'p-value', 'inference', [1700, 1000], {
        title: 'p-value',
        explanation: 'The probability of observing your data (or more extreme) if the null hypothesis (H₀) were true.',
        formulas: [
            formula('p < \\alpha \\implies \\text{Reject } H_0', 'Decision Rule'),
            formula('p \\ge \\alpha \\implies \\text{Fail to Reject } H_0', 'Decision Rule')
        ],
        symbols: ['Small p = surprising result (reject H₀)', 'Large p = not surprising (fail to reject H₀)'],
        connections: ['hypothesis', 'ttest', 'ztest', 'chisq', 'anova']
    }),

    createNode('alpha', 'Alpha (α) / Type I Error', 'inference', [1700, 1150], {
        title: 'Alpha (α) / Type I Error',
        explanation: 'Alpha (α) is the significance level, the probability of a Type I error. This is *rejecting a true null hypothesis*.',
        formulas: [
            formula('\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ is true})', 'Probability of Type I Error'),
            formula('\\text{Usually } \\alpha = 0.05', 'Common significance level')
        ],
        symbols: ['α = Level of Significance', 'False Positive'],
        connections: ['hypothesis', 'beta']
    }),

    createNode('beta', 'Beta (β) / Type II Error', 'inference', [1700, 1300], {
        title: 'Beta (β) / Type II Error',
        explanation: 'Beta (β) is the probability of a Type II error. This is *failing to reject a false null hypothesis*.',
        formulas: [
            formula('\\beta = P(\\text{Fail to Reject } H_0 \\mid H_0 \\text{ is false})', 'Probability of Type II Error')
        ],
        symbols: ['β = Probability of Type II Error', 'False Negative'],
        connections: ['hypothesis', 'alpha', 'power']
    }),

    createNode('power', 'Statistical Power', 'inference', [1900, 1300], {
        title: 'Statistical Power',
        explanation: 'The probability of correctly rejecting a false null hypothesis. The ability to detect a real effect.',
        formulas: [
            formula('\\text{Power} = 1 - \\beta', 'Power calculation'),
            formula('P(\\text{Reject } H_0 \\mid H_0 \\text{ is false})', 'Probability of a True Positive')
        ],
        symbols: ['Higher power is better', 'Increased by larger sample size (n)'],
        connections: ['beta']
    }),

    // ========== NEW: CORRELATION / VARIANCE DETAILS ==========
    createNode('r_squared', 'R-Squared (r²)', 'relationship', [2200, 700], {
        title: 'Coefficient of Determination (r²)',
        explanation: 'The proportion of variance in the dependent variable (Y) that is predictable from the independent variable (X).',
        formulas: [
            formula('r^2 = (\\text{correlation coefficient})^2', 'Calculation'),
            formula('0 \\le r^2 \\le 1', 'Range')
        ],
        symbols: ['r² = variance explained', 'e.g., r=0.8 -> r²=0.64 -> 64% of variance explained'],
        connections: ['correlation', 'regression']
    }),

    createNode('var_sum', 'Variance of Sum', 'variance-related', [1300, 700], {
        title: 'Variance of a Sum/Difference',
        explanation: 'How to find the variance of two combined variables. Depends on their covariance.',
        formulas: [
            formula('Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y)', 'Variance of a sum'),
            formula('Var(X-Y) = Var(X) + Var(Y) - 2Cov(X,Y)', 'Variance of a difference')
        ],
        symbols: ['If independent, Cov(X,Y)=0', 'Var(X+Y) = Var(X) + Var(Y) (if independent)'],
        connections: ['variance', 'covariance']
    }),

    createNode('reg_geom_mean', 'Correlation (from regression)', 'relationship', [2200, 550], {
        title: 'Correlation from Regression',
        explanation: 'Correlation is the geometric mean of the two regression coefficients (Y on X, and X on Y).',
        formulas: [
            formula('r = \\sqrt{b_{yx} \\times b_{xy}}', 'Geometric Mean')
        ],
        symbols: ['r = correlation', 'b_yx = slope of Y~X', 'b_xy = slope of X~Y'],
        connections: ['correlation', 'regcoef']
    }),

    // ========== NEW: CHI-SQUARE VARIANCE TEST ==========
    createNode('chisq_var_test', 'χ² Test for Variance', 'variance-related', [700, 1000], {
        title: 'Chi-square Test for Variance',
        explanation: 'Tests if the variance of a sample is equal to a specific hypothesized value.',
        formulas: [
            formula('\\chi^2 = \\frac{(n-1)s^2}{\\sigma_0^2}', 'Test Statistic'),
            formula('df = n-1', 'Degrees of freedom')
        ],
        symbols: ['s² = sample variance', 'σ₀² = hypothesized population variance', 'n = sample size'],
        connections: ['chisqdist', 'variance', 'hypothesis']
    }),

    // ========== NEW: SAMPLING TECHNIQUES ==========
    createNode('sampling', 'Sampling Techniques', 'sampling', [1900, 100], {
        title: 'Sampling Techniques',
        explanation: 'Methods for selecting a subset of individuals from a population to estimate characteristics of the whole population.',
        formulas: [],
        symbols: ['Population = entire group', 'Sample = subset you measure'],
        connections: ['data', 'prob_sampling', 'nonprob_sampling']
    }),

    createNode('prob_sampling', 'Probability Sampling', 'sampling', [2100, 50], {
        title: 'Probability Sampling',
        explanation: 'Every member of the population has a known, non-zero chance of being selected. Allows for statistical inference.',
        formulas: [],
        symbols: ['Unbiased', 'Generalizable'],
        connections: ['sampling', 'srs', 'stratified', 'cluster', 'systematic']
    }),

    createNode('nonprob_sampling', 'Non-Probability Sampling', 'sampling', [2100, 200], {
        title: 'Non-Probability Sampling',
        explanation: 'Selection is non-random, based on convenience or other criteria. Prone to bias.',
        formulas: [],
        symbols: ['Biased', 'Not generalizable', 'Used for exploratory research'],
        connections: ['sampling', 'convenience', 'quota', 'snowball']
    }),

    createNode('srs', 'Simple Random', 'sampling', [2300, 0], {
        title: 'Simple Random Sampling (SRS)',
        explanation: 'Everyone has an equal chance of selection.',
        connections: ['prob_sampling']
    }),
    createNode('stratified', 'Stratified Sampling', 'sampling', [2300, 50], {
        title: 'Stratified Sampling',
        explanation: 'Divide population into sub-groups (strata), then take SRS from each.',
        connections: ['prob_sampling']
    }),
    createNode('cluster', 'Cluster Sampling', 'sampling', [2300, 100], {
        title: 'Cluster Sampling',
        explanation: 'Divide population into clusters (e.g., cities), randomly select clusters, and sample all members within.',
        connections: ['prob_sampling']
    }),
    createNode('systematic', 'Systematic Sampling', 'sampling', [2300, 150], {
        title: 'Systematic Sampling',
        explanation: 'Select every k-th person from a list.',
        connections: ['prob_sampling']
    }),

    createNode('convenience', 'Convenience Sampling', 'sampling', [2300, 200], {
        title: 'Convenience Sampling',
        explanation: 'Sample whoever is easiest to access.',
        connections: ['nonprob_sampling']
    }),
    createNode('quota', 'Quota Sampling', 'sampling', [2300, 250], {
        title: 'Quota Sampling',
        explanation: 'Select people non-randomly to meet a quota for sub-groups.',
        connections: ['nonprob_sampling']
    }),
    createNode('snowball', 'Snowball Sampling', 'sampling', [2300, 300], {
        title: 'Snowball Sampling',
        explanation: 'Participants recruit future subjects from among their acquaintances.',
        connections: ['nonprob_sampling']
    })
];

// ============================================
// COMPLETE CONNECTIONS (Original + New)
// ============================================

const connectionPairs = [
    ['data', 'count'], ['data', 'sum'], ['count', 'mean'], ['sum', 'mean'],
    ['mean', 'deviation'], ['deviation', 'ss'], ['deviation', 'zscore'],
    ['ss', 'variance'], ['variance', 'sd'], ['sd', 'se'], ['count', 'se'],
    ['mean', 'covariance'], ['covariance', 'correlation'], ['sd', 'correlation'],
    ['count', 'df'], ['df', 'variance'], ['df', 'tdist'], ['df', 'chisqdist'],
    ['se', 'ci'], ['se', 'ttest'], ['se', 'ztest'],
    ['zscore', 'normal'], ['zscore', 'ztest'],
    ['normal', 'ztest'], ['tdist', 'ttest'], ['chisqdist', 'chisq'], ['fdist', 'ftest'], ['fdist', 'anova'],
    ['hypothesis', 'ttest'], ['hypothesis', 'ztest'], ['hypothesis', 'chisq'], ['hypothesis', 'anova'], ['hypothesis', 'ftest'],
    ['ttest', 'ttest1'], ['ttest', 'ttest2'], ['ttest', 'ttestpaired'], ['ttest2', 'pooled'], ['variance', 'pooled'],
    ['chisq', 'chisqgof'], ['chisq', 'chisqind'], ['chisqdist', 'chinormal'], ['normal', 'chinormal'],
    ['ss', 'ssb'], ['ss', 'ssw'], ['anova', 'ssb'], ['anova', 'ssw'],
    ['ssb', 'msb'], ['ssw', 'msw'], ['msb', 'anova1'], ['msw', 'anova1'],
    ['anova', 'anova1'], ['anova', 'anova2'], ['anova1', 'ftest'],
    ['correlation', 'regression'], ['correlation', 'regcoef'], ['regression', 'regcoef'],
    ['regression', 'intercept'], ['mean', 'intercept'],
    ['variance', 'ftest'], ['chisqdist', 'fdist'],

    // New Connections
    ['bernoulli', 'binomial'],
    ['binomial', 'binnormal'],
    ['normal', 'binnormal'],
    ['binomial', 'binpoisson'],
    ['poisson', 'binpoisson'],
    ['binomial', 'multinomial'],
    ['geometric', 'negbinomial'],
    ['hypergeometric', 'mvhypergeometric'],
    ['binomial', 'hypergeometric'], 
    ['hypothesis', 'pvalue'],
    ['hypothesis', 'alpha'],
    ['hypothesis', 'beta'],
    ['beta', 'power'],
    ['alpha', 'beta'], 
    ['pvalue', 'ttest'], 
    ['pvalue', 'ztest'],
    ['pvalue', 'chisq'],
    ['pvalue', 'anova'],
    ['correlation', 'r_squared'],
    ['regression', 'r_squared'],
    ['variance', 'var_sum'],
    ['covariance', 'var_sum'],
    ['correlation', 'reg_geom_mean'],
    ['regcoef', 'reg_geom_mean'],
    ['chisqdist', 'chisq_var_test'],
    ['variance', 'chisq_var_test'],
    ['hypothesis', 'chisq_var_test'],
    ['ftest', 'chisq_var_test'], 
    ['data', 'sampling'],
    ['sampling', 'prob_sampling'],
    ['sampling', 'nonprob_sampling'],
    ['prob_sampling', 'srs'],
    ['prob_sampling', 'stratified'],
    ['prob_sampling', 'cluster'],
    ['prob_sampling', 'systematic'],
    ['nonprob_sampling', 'convenience'],
    ['nonprob_sampling', 'quota'],
    ['nonprob_sampling', 'snowball']
];

const connections = connectionPairs.map(([from, to]) => ({ from, to }));